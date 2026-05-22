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
  ["thin", `<path d="M132,24V232a4,4,0,0,1-8,0V24a4,4,0,0,1,8,0Z"/>`],
  ["light", `<path d="M134,24V232a6,6,0,0,1-12,0V24a6,6,0,0,1,12,0Z"/>`],
  ["regular", `<path d="M136,24V232a8,8,0,0,1-16,0V24a8,8,0,0,1,16,0Z"/>`],
  ["bold", `<path d="M140,24V232a12,12,0,0,1-24,0V24a12,12,0,0,1,24,0Z"/>`],
  ["fill", `<path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM136,192a8,8,0,0,1-16,0V64a8,8,0,0,1,16,0Z"/>`],
  ["duotone", `<path d="M224,48V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48Z" opacity="0.2"/><path d="M136,24V232a8,8,0,0,1-16,0V24a8,8,0,0,1,16,0Z"/>`],
  ]);
</script>

<IconBase
  weights={_weights}
  displayName="LineVertical"
  {color}
  {size}
  {weight}
  {mirrored}
  {alt}
  class={klass}
  {...$$restProps}
/>
