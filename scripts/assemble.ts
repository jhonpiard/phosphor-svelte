#!/usr/bin/env tsx
/**
 * assemble.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates all Svelte icon components from @phosphor-icons/core SVG assets.
 *
 * Usage:
 *   pnpm assemble              # generate everything
 *   pnpm assemble --dry-run    # show what would be generated
 *   pnpm assemble --limit 10   # generate first 10 icons (for testing)
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── config ────────────────────────────────────────────────────────────────────

const WEIGHTS = ["thin", "light", "regular", "bold", "fill", "duotone"] as const;
type Weight = (typeof WEIGHTS)[number];

/** Where the @phosphor-icons/core assets live */
const CORE_ASSETS = path.join(ROOT, "node_modules/@phosphor-icons/core/assets");
/** Where to write the generated components */
const OUT_DIR = path.join(ROOT, "src/lib/icons");
/** Barrel index file */
const INDEX_FILE = path.join(ROOT, "src/lib/index.ts");

// ── CLI flags ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const LIMIT = (() => {
  const idx = args.indexOf("--limit");
  return idx !== -1 ? parseInt(args[idx + 1], 10) : Infinity;
})();

// ── helpers ───────────────────────────────────────────────────────────────────

/** Strip the outer `<svg …>…</svg>` wrapper, returning only the inner markup. */
function extractInner(svgContent: string): string {
  return svgContent
    .replace(/<svg[^>]*>/i, "")
    .replace(/<\/svg\s*>/i, "")
    .trim();
}

/** Escape backticks / template-literal special chars in raw SVG strings. */
function escapeTpl(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

/**
 * Convert kebab-case to PascalCase.
 * e.g. "arrow-circle-up" → "ArrowCircleUp"
 */
function toPascal(kebab: string): string {
  return kebab
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

/** Read the inner SVG content for a given icon name + weight, or return null. */
function readWeight(iconName: string, weight: Weight): string | null {
  // Regular uses no suffix; all others append -<weight>
  const fileName =
    weight === "regular" ? `${iconName}.svg` : `${iconName}-${weight}.svg`;
  const filePath = path.join(CORE_ASSETS, weight, fileName);

  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return extractInner(raw);
}

// ── component template ────────────────────────────────────────────────────────

function generateComponent(pascalName: string, weights: Record<Weight, string | null>): string {
  const weightEntries = WEIGHTS.map((w) => {
    const inner = weights[w];
    return inner != null
      ? `  ["${w}", \`${escapeTpl(inner)}\`],`
      : null;
  })
    .filter(Boolean)
    .join("\n");

  return `<script lang="ts">
  import IconBase from "../IconBase.svelte";
  import type { IconProps, IconWeights } from "../types.js";

  type $$Props = IconProps;

  export let color: $$Props["color"] = undefined;
  export let size: $$Props["size"] = undefined;
  export let weight: $$Props["weight"] = undefined;
  export let mirrored: $$Props["mirrored"] = undefined;
  export let alt: $$Props["alt"] = undefined;

  let klass: string = "";
  export { klass as class };

  const _weights: IconWeights = new Map([
${weightEntries}
  ]);
</script>

<IconBase
  weights={_weights}
  displayName="${pascalName}"
  {color}
  {size}
  {weight}
  {mirrored}
  {alt}
  class={klass}
  {...$$restProps}
/>
`;
}

// ── barrel index template ─────────────────────────────────────────────────────

function generateIndex(iconNames: string[]): string {
  const iconExports = iconNames
    .map((name) => {
      const pascal = toPascal(name);
      return `export { default as ${pascal} } from "./icons/${pascal}.svelte";`;
    })
    .join("\n");

  return `// ─────────────────────────────────────────────────────────────────────────────
// AUTO-GENERATED — do not edit by hand.
// Run \`pnpm assemble\` to regenerate from @phosphor-icons/core.
// ─────────────────────────────────────────────────────────────────────────────

export { default as IconBase } from "./IconBase.svelte";
export { default as IconContext } from "./IconContext.svelte";
export type {
  IconProps,
  IconWeight,
  IconWeights,
  IconContextValue,
} from "./types.js";

// ── Icons (${iconNames.length} total) ─────────────────────────────────────────
${iconExports}
`;
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🔷 Phosphor Svelte — component assembler");
  console.log(`   core assets : ${CORE_ASSETS}`);
  console.log(`   output dir  : ${OUT_DIR}`);
  if (DRY_RUN) console.log("   ⚠️  DRY RUN – no files will be written\n");

  // Verify core assets exist
  if (!fs.existsSync(CORE_ASSETS)) {
    console.error("❌  @phosphor-icons/core assets not found. Run `pnpm install` first.");
    process.exit(1);
  }

  // Discover icon names from the "regular" weight folder (canonical source)
  const regularDir = path.join(CORE_ASSETS, "regular");
  const svgFiles = fs
    .readdirSync(regularDir)
    .filter((f) => f.endsWith(".svg"));

  // Regular weight files have no suffix: e.g. "horse.svg" → "horse"
  const iconNames = svgFiles
    .map((f) => f.replace(/\.svg$/, ""))
    .sort()
    .slice(0, LIMIT);

  console.log(`\n📦 Found ${svgFiles.length} icons in core, generating ${iconNames.length}…\n`);

  if (!DRY_RUN) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  let generated = 0;
  let skipped = 0;

  for (const iconName of iconNames) {
    const pascalName = toPascal(iconName);

    // Read all weights
    const weightData = Object.fromEntries(
      WEIGHTS.map((w) => [w, readWeight(iconName, w)])
    ) as Record<Weight, string | null>;

    const hasAnyWeight = WEIGHTS.some((w) => weightData[w] !== null);
    if (!hasAnyWeight) {
      console.warn(`⚠️  Skipping ${iconName}: no SVG data found`);
      skipped++;
      continue;
    }

    const component = generateComponent(pascalName, weightData);
    const outPath = path.join(OUT_DIR, `${pascalName}.svelte`);

    if (DRY_RUN) {
      console.log(`  [dry] would write → ${path.relative(ROOT, outPath)}`);
    } else {
      fs.writeFileSync(outPath, component, "utf8");
    }
    generated++;
  }

  // Write barrel index
  const indexContent = generateIndex(iconNames);
  if (DRY_RUN) {
    console.log(`\n  [dry] would write → ${path.relative(ROOT, INDEX_FILE)}`);
  } else {
    fs.writeFileSync(INDEX_FILE, indexContent, "utf8");
    console.log(`✅  Wrote index → ${path.relative(ROOT, INDEX_FILE)}`);
  }

  console.log(`\n🎉 Done!`);
  console.log(`   generated : ${generated} components`);
  if (skipped) console.log(`   skipped   : ${skipped} (missing SVGs)`);
  console.log(`   output    : ${path.relative(ROOT, OUT_DIR)}/\n`);
}

main().catch((err) => {
  console.error("❌  Assembly failed:", err);
  process.exit(1);
});
