<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLLabelAttributes } from "svelte/elements";

	type $$Props = HTMLLabelAttributes;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<label {...$$restProps} class={cn("font-bold", className)}><slot /></label>
