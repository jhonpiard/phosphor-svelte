<script lang="ts">
  import { getContext } from "svelte";
  import type { IconWeight, IconWeights, IconContextValue } from "./types.js";
  import { DEFAULT_CONTEXT } from "./types.js";

  // ── props ────────────────────────────────────────────────────────────────────
  /** Raw inner-SVG markup, keyed by weight. Provided by each generated icon component. */
  export let weights: IconWeights;

  /** Icon display name, used as a fallback title for accessibility. */
  export let displayName: string = "";

  /** Override color. Falls back to context, then `"currentColor"`. */
  export let color: string | undefined = undefined;

  /** Override size (px). Falls back to context, then `24`. */
  export let size: number | string | undefined = undefined;

  /** Override weight. Falls back to context, then `"regular"`. */
  export let weight: IconWeight | undefined = undefined;

  /** Mirror the icon horizontally. Falls back to context, then `false`. */
  export let mirrored: boolean | undefined = undefined;

  /** Accessible label rendered as `<title>` inside the SVG. */
  export let alt: string | undefined = undefined;

  /** Extra CSS class forwarded to `<svg>`. */
  let klass: string = "";
  export { klass as class };

  // ── context ──────────────────────────────────────────────────────────────────
  $: ctx = getContext<IconContextValue>("phosphor-svelte") ?? DEFAULT_CONTEXT;

  // ── resolved values ───────────────────────────────────────────────────────────
  $: resolvedColor = color ?? ctx.color ?? DEFAULT_CONTEXT.color;
  $: resolvedSize = size ?? ctx.size ?? DEFAULT_CONTEXT.size;
  $: resolvedWeight = weight ?? ctx.weight ?? DEFAULT_CONTEXT.weight;
  $: resolvedMirrored = mirrored ?? ctx.mirrored ?? DEFAULT_CONTEXT.mirrored;

  // ── SVG content ───────────────────────────────────────────────────────────────
  $: svgContent = weights.get(resolvedWeight) ?? weights.get("regular") ?? "";

  // ── derived attributes ────────────────────────────────────────────────────────
  $: titleId = alt ? `${displayName}-title` : undefined;
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 256 256"
  width={resolvedSize}
  height={resolvedSize}
  fill={resolvedColor}
  transform={resolvedMirrored ? "scale(-1, 1)" : undefined}
  aria-label={alt ?? undefined}
  aria-labelledby={titleId}
  role={alt ? "img" : "presentation"}
  aria-hidden={alt ? undefined : true}
  class={klass}
  {...$$restProps}
>
  {#if alt}
    <title id={titleId}>{alt}</title>
  {/if}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html svgContent}
</svg>
