<script lang="ts" generics="T extends Record<string, unknown>, K extends FormPathLeaves<T>">
	import type { HTMLTextareaAttributes } from "svelte/elements";

	import type { FormFieldProps } from "./type";

	import { formFieldProxy, type FormPathLeaves } from "sveltekit-superforms";
	import FormDiv from "./FormDiv.svelte";
	import FormLabel from "./FormLabel.svelte";
	import FormError from "./FormError.svelte";

	type $$Props = FormFieldProps<T, K, HTMLTextareaAttributes>;

	export let id: $$Props["id"] = undefined;
	export let name: $$Props["name"];
	export let label: $$Props["label"] = undefined;
	export let form: $$Props["form"];
	export let rows: $$Props["rows"] = 3;

	const { value, errors } = formFieldProxy(form, name);
</script>

<FormDiv>
	{#if label}
		<FormLabel for={id}>{label}</FormLabel>
	{/if}
	<textarea
		{...$$restProps}
		{id}
		{name}
		{rows}
		class="rounded border px-2 py-1 text-black"
		bind:value={$value}
	/>
	<FormError errors={$errors} />
</FormDiv>
