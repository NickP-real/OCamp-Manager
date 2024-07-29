<script lang="ts" generics="T">
	import type { FormInputEvent } from '../ui/type';

	import TextInput from '../ui/TextInput.svelte';

	import { createEventDispatcher } from 'svelte';
	import { ChevronsUpDown } from 'lucide-svelte';

	const dispatch = createEventDispatcher<{ itemselect: T }>();

	let inputRef: HTMLInputElement;
	let searchValue = '';
	let isOpen = false;

	type Item = { label: string; value: T };

	export let items: Item[];
	export let id: string;

	$: searchResult = items.filter((value) => {
		const search = searchValue.toLowerCase().replace(/\s/g, '');
		return value.label.toLowerCase().replace(/\s/g, '').includes(search);
	});

	$: isPopoverHidden = (searchResult.length === 0 || searchValue.length === 0) && !isOpen;

	function resetField() {
		searchValue = '';
		isOpen = false;
	}

	function onExpandClick() {
		isOpen = !isOpen;
		if (isOpen) inputRef.focus();
	}

	function handleOnItemSelect(item: T) {
		dispatch('itemselect', item);
		resetField();
	}

	function onInputFocus() {
		isOpen = true;
	}

	function onInputBlur(e: FocusEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		if (e.relatedTarget && 'role' in e.relatedTarget && e.relatedTarget.role === 'option') return;
		resetField();
	}

	function onInputKeydown(e: FormInputEvent<KeyboardEvent>) {
		if (e.key === 'Escape') resetField();
	}
</script>

<div class="relative">
	<div class="relative">
		<TextInput
			{id}
			bind:inputRef
			on:blur={onInputBlur}
			on:focus={onInputFocus}
			on:keydown={onInputKeydown}
			class="w-full"
			bind:value={searchValue}
		/>
		<button type="button" class="absolute right-2 top-0 translate-y-1/2" on:click={onExpandClick}>
			<ChevronsUpDown class="size-5 text-black opacity-50 hover:opacity-100" />
		</button>
	</div>

	{#if !isPopoverHidden}
		<div class="absolute w-full border-neutral-100 bg-white text-black" role="listbox">
			{#each searchResult as result}
				<button
					type="button"
					role="option"
					aria-selected={items.includes(result)}
					class="w-full p-2 text-left hover:bg-blue-100"
					on:click={() => handleOnItemSelect(result.value)}
				>
					{result.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
