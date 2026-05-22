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
  ["thin", `<path d="M196,64V168a4,4,0,0,1-8,0V73.66L66.83,194.83a4,4,0,0,1-5.66-5.66L182.34,68H88a4,4,0,0,1,0-8H192A4,4,0,0,1,196,64Z"/>`],
  ["light", `<path d="M198,64V168a6,6,0,0,1-12,0V78.48L68.24,196.24a6,6,0,0,1-8.48-8.48L177.52,70H88a6,6,0,0,1,0-12H192A6,6,0,0,1,198,64Z"/>`],
  ["regular", `<path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"/>`],
  ["bold", `<path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"/>`],
  ["fill", `<path d="M200,64V168a8,8,0,0,1-13.66,5.66L140,127.31,69.66,197.66a8,8,0,0,1-11.32-11.32L128.69,116,82.34,69.66A8,8,0,0,1,88,56H192A8,8,0,0,1,200,64Z"/>`],
  ["duotone", `<path d="M192,64V168L88,64Z" opacity="0.2"/><path d="M192,56H88a8,8,0,0,0-5.66,13.66L128.69,116,58.34,186.34a8,8,0,0,0,11.32,11.32L140,127.31l46.34,46.35A8,8,0,0,0,200,168V64A8,8,0,0,0,192,56Zm-8,92.69-38.34-38.34h0L107.31,72H184Z"/>`],
  ]);
</script>

<IconBase
  weights={_weights}
  displayName="ArrowUpRight"
  {color}
  {size}
  {weight}
  {mirrored}
  {alt}
  class={klass}
  {...$$restProps}
/>
