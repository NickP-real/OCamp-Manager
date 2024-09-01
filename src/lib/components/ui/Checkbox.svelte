<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { type InputEvents } from "./type";

	type $$Props = HTMLInputAttributes & { onChange: HTMLInputAttributes["on:change"] };
	type $$Events = InputEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let checked: $$Props["checked"] = undefined;
	export let indeterminate: $$Props["indeterminate"] = undefined;
	export let onChange: $$Props["on:change"] = undefined;
</script>

<input
	{...$$restProps}
	type="checkbox"
	class={cn("rounded border", className)}
	on:blur
	on:focus
	bind:checked
	bind:indeterminate
	on:change={onChange}
/>
