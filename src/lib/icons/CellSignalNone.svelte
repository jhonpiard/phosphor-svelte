<script lang="ts">
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
  ["thin", `<path d="M44,192v8a4,4,0,0,1-8,0v-8a4,4,0,0,1,8,0Z"/>`],
  ["light", `<path d="M46,192v8a6,6,0,0,1-12,0v-8a6,6,0,0,1,12,0Z"/>`],
  ["regular", `<path d="M48,192v8a8,8,0,0,1-16,0v-8a8,8,0,0,1,16,0Z"/>`],
  ["bold", `<path d="M52,192v8a12,12,0,0,1-24,0v-8a12,12,0,0,1,24,0Z"/>`],
  ["fill", `<path d="M198.12,25.23a16,16,0,0,0-17.44,3.46l-160,160A16,16,0,0,0,32,216H192a16,16,0,0,0,16-16V40A15.94,15.94,0,0,0,198.12,25.23ZM192,200H32L192,40Z"/>`],
  ["duotone", `<path d="M198.12,25.23a16,16,0,0,0-17.43,3.47l-160,160A16,16,0,0,0,32,216H192a16,16,0,0,0,16-16V40A16,16,0,0,0,198.12,25.23ZM192,200H32L192,40Z"/>`],
  ]);
</script>

<IconBase
  weights={_weights}
  displayName="CellSignalNone"
  {color}
  {size}
  {weight}
  {mirrored}
  {alt}
  class={klass}
  {...$$restProps}
/>
