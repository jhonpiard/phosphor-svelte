<script lang="ts">
  import { setContext } from "svelte";
  import type { IconContextValue, IconWeight } from "./types.js";
  import { DEFAULT_CONTEXT } from "./types.js";

  export let color: string = DEFAULT_CONTEXT.color;
  export let size: number | string = DEFAULT_CONTEXT.size;
  export let weight: IconWeight = DEFAULT_CONTEXT.weight;
  export let mirrored: boolean = DEFAULT_CONTEXT.mirrored;

  $: setContext<IconContextValue>("phosphor-svelte", {
    color,
    size,
    weight,
    mirrored,
  });
</script>

<slot />
