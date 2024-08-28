<script lang="ts" generics="T">
	import { generateId } from "../utils";
	import type { FormInputEvent } from "../ui/type";
	import TextInput from "../ui/TextInput.svelte";
	import { createEventDispatcher } from "svelte";
	import { ChevronsUpDown } from "lucide-svelte";
	import FormLabel from "./FormLabel.svelte";
	import FormDiv from "./FormDiv.svelte";

	const dispatch = createEventDispatcher<{ itemselect: T; inputchange: string }>();

	let inputRef: HTMLInputElement;
	let searchValue = "";
	let isOpen = false;

	type Item = { label: string; value: T };

	export let items: Item[];
	export let id: string = generateId();
	export let reset = true;
	export let label: string | undefined = undefined;

	$: searchValue, dispatch("inputchange", searchValue);

	$: searchResult = items.filter((value) => {
		const search = searchValue.toLowerCase().replace(/\s/g, "");
		return value.label.toLowerCase().replace(/\s/g, "").includes(search);
	});

	$: isPopoverHidden = (searchResult.length === 0 || searchValue.length === 0) && !isOpen;

	function resetField() {
		searchValue = "";
		isOpen = false;
	}

	function onExpandClick() {
		isOpen = !isOpen;
		if (isOpen) inputRef.focus();
	}

	function handleOnItemSelect(item: T) {
		dispatch("itemselect", item);
		if (reset) resetField();
	}

	function onInputFocus() {
		isOpen = true;
	}

	function onInputBlur(e: FocusEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		if (e.relatedTarget && "role" in e.relatedTarget && e.relatedTarget.role === "option") return;
		if (reset) resetField();
	}

	function onInputKeydown(e: FormInputEvent<KeyboardEvent>) {
		if (e.key === "Escape") resetField();
	}
</script>

<div class="relative">
	<FormDiv>
		{#if label}
			<FormLabel for={id}>{label}</FormLabel>
		{/if}
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
	</FormDiv>

	{#if !isPopoverHidden}
		<div class="absolute z-10 w-full border-neutral-100 bg-white text-black" role="listbox">
			{#if searchResult.length === 0}
				<div class="w-full p-2 text-left text-neutral-500">No result</div>
			{:else}
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
			{/if}
		</div>
	{/if}
</div>
