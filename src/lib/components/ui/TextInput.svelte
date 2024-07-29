<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { type InputEvents } from './type';

	type $$Props = HTMLInputAttributes & { inputRef?: HTMLInputElement };
	type $$Events = InputEvents;

	export let inputRef: $$Props['inputRef'] = undefined;
	let className: $$Props['class'] = undefined;
	export { className as class };
	export let value: $$Props['value'] = undefined;
</script>

<input
	{...$$restProps}
	bind:this={inputRef}
	type="text"
	class={cn('rounded text-black', className)}
	on:blur
	on:focus
	on:keydown
	bind:value
/>
