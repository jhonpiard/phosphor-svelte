# @phosphor-icons/svelte

[![CI](https://github.com/YOUR_USERNAME/phosphor-svelte/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/phosphor-svelte/actions/workflows/ci.yml)
[![Sync](https://github.com/YOUR_USERNAME/phosphor-svelte/actions/workflows/sync.yml/badge.svg)](https://github.com/YOUR_USERNAME/phosphor-svelte/actions/workflows/sync.yml)

> **Phosphor Icons for Svelte** — 1,512 icons × 6 weights, auto-generated from the official [`@phosphor-icons/core`](https://github.com/phosphor-icons/core) SVG assets.

A faithful Svelte port of the official React & Vue libraries, with an identical prop API, full TypeScript support, SSR compatibility, and tree-shakeable per-icon components.

---

## Installation

Install directly from GitHub — no npm publishing required:

```bash
# pnpm
pnpm add github:YOUR_USERNAME/phosphor-svelte

# npm
npm install github:YOUR_USERNAME/phosphor-svelte

# yarn
yarn add github:YOUR_USERNAME/phosphor-svelte
```

---

## Usage

```svelte
<script>
  import { Horse, Heart, Star } from "@phosphor-icons/svelte";
</script>

<Horse />
<Heart color="#AE2983" weight="fill" size={32} />
<Star weight="duotone" />
```

### Tree-shakeable per-icon imports (recommended for large apps)

```svelte
<script>
  import Horse from "@phosphor-icons/svelte/icons/Horse.svelte";
</script>

<Horse weight="bold" size={48} />
```

---

## Props

Every icon component accepts the following props (all optional):

| Prop       | Type                                                        | Default          | Description                                  |
|------------|-------------------------------------------------------------|------------------|----------------------------------------------|
| `color`    | `string`                                                    | `"currentColor"` | Stroke/fill color — any valid CSS color      |
| `size`     | `number \| string`                                          | `24`             | Width and height in pixels                   |
| `weight`   | `"thin" \| "light" \| "regular" \| "bold" \| "fill" \| "duotone"` | `"regular"` | Icon variant                        |
| `mirrored` | `boolean`                                                   | `false`          | Flip horizontally (RTL support)              |
| `alt`      | `string`                                                    | —                | Accessible label rendered as `<title>`       |
| `class`    | `string`                                                    | —                | Extra CSS class forwarded to `<svg>`         |

All other attributes (e.g. `on:click`, `style`, `data-*`) are forwarded to the underlying `<svg>` element.

---

## Context — Global Defaults

Use `IconContext` to apply default styles to all descendant icons:

```svelte
<script>
  import { IconContext, Horse, Heart, Star } from "@phosphor-icons/svelte";
</script>

<!-- All icons inside inherit color + weight -->
<IconContext color="royalblue" weight="duotone" size={32}>
  <Horse />
  <Heart />
  <Star />
</IconContext>
```

Individual icon props always override context values.

---

## Weights

| Weight     | Description                        |
|------------|------------------------------------|
| `thin`     | 0.5× stroke                        |
| `light`    | 0.75× stroke                       |
| `regular`  | Standard stroke (default)          |
| `bold`     | 1.5× stroke                        |
| `fill`     | Solid filled variant               |
| `duotone`  | Two-layer, background at 20% alpha |

---

## SSR / SvelteKit

All components are SSR-compatible out of the box. No browser-specific APIs are used. Import normally inside server-rendered pages or layouts.

---

## Custom Icons

You can build your own icons using `IconBase` with the same props system:

```svelte
<!-- MyCustomIcon.svelte -->
<script lang="ts">
  import { IconBase } from "@phosphor-icons/svelte";
  import type { IconProps, IconWeights } from "@phosphor-icons/svelte";

  type $$Props = IconProps;

  export let color: $$Props["color"] = undefined;
  export let size: $$Props["size"] = undefined;
  export let weight: $$Props["weight"] = undefined;
  export let mirrored: $$Props["mirrored"] = undefined;
  export let alt: $$Props["alt"] = undefined;

  let klass = "";
  export { klass as class };

  const weights: IconWeights = new Map([
    ["thin",    `<path d="..."/>`],
    ["light",   `<path d="..."/>`],
    ["regular", `<path d="..."/>`],
    ["bold",    `<path d="..."/>`],
    ["fill",    `<path d="..."/>`],
    ["duotone", `<path opacity="0.2" d="..."/><path d="..."/>`],
  ]);
</script>

<IconBase
  {weights}
  displayName="MyCustomIcon"
  {color} {size} {weight} {mirrored} {alt}
  class={klass}
  {...$$restProps}
/>
```

---

## Regenerating icons

The source SVG data is pulled entirely from `@phosphor-icons/core`. To regenerate:

```bash
# Install dependencies
pnpm install

# Regenerate all 1,512 components from the installed core package
pnpm assemble

# Dry-run (preview only, no writes)
pnpm assemble -- --dry-run

# Generate a subset for testing
pnpm assemble -- --limit 20
```

---

## Staying in sync with upstream

A [GitHub Actions workflow](.github/workflows/sync.yml) runs daily at midnight UTC. When a new version of `@phosphor-icons/core` is published, it automatically:

1. Updates the package
2. Runs `pnpm assemble`
3. Opens a Pull Request with the diff

You can also trigger it manually from the **Actions** tab.

---

## Repo structure

```
phosphor-svelte/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Build verification on every PR/push
│       └── sync.yml        # Daily upstream sync → auto-PR
├── scripts/
│   └── assemble.ts         # Generator — reads SVGs, writes .svelte files
├── src/
│   └── lib/
│       ├── IconBase.svelte  # Shared SVG wrapper (all icons render through this)
│       ├── IconContext.svelte # Context provider for default props
│       ├── types.ts         # TypeScript types & defaults
│       ├── index.ts         # Auto-generated barrel (all icon exports + types)
│       └── icons/           # Auto-generated per-icon Svelte components
│           ├── Acorn.svelte
│           ├── AddressBook.svelte
│           └── … (1,512 total)
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## License

MIT © [Phosphor Icons](https://github.com/phosphor-icons) (original SVG assets)  
MIT — this port
