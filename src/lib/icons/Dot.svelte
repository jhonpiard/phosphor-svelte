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
  ["thin", `<path d="M136,128a8,8,0,1,1-8-8A8,8,0,0,1,136,128Z"/>`],
  ["light", `<path d="M138,128a10,10,0,1,1-10-10A10,10,0,0,1,138,128Z"/>`],
  ["regular", `<path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"/>`],
  ["bold", `<path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128Z"/>`],
  ["fill", `<path d="M128,80a48,48,0,1,0,48,48A48,48,0,0,0,128,80Zm0,60a12,12,0,1,1,12-12A12,12,0,0,1,128,140Z"/>`],
  ["duotone", `<path d="M176,128a48,48,0,1,1-48-48A48,48,0,0,1,176,128Z" opacity="0.2"/><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"/>`],
  ]);
</script>

<IconBase
  weights={_weights}
  displayName="Dot"
  {color}
  {size}
  {weight}
  {mirrored}
  {alt}
  class={klass}
  {...$$restProps}
/>
