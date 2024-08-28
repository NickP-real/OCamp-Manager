<script lang="ts" generics="T extends Record<string, unknown>, K extends FormPathLeaves<T>">
	import { generateId } from "../utils";

	import FormError from "./FormError.svelte";

	import { type InputEvents } from "../ui/type";

	import type { FormFieldProps } from "./type";

	import { formFieldProxy, type FormPathLeaves } from "sveltekit-superforms";

	import type { HTMLInputAttributes } from "svelte/elements";
	import FormDiv from "./FormDiv.svelte";
	import FormLabel from "./FormLabel.svelte";
	import TextInput from "../ui/TextInput.svelte";

	type $$Props = FormFieldProps<T, K, HTMLInputAttributes> & { inputRef?: HTMLInputElement };
	type $$Events = InputEvents;

	export let inputRef: $$Props["inputRef"] = undefined;

	export let id: $$Props["id"] = generateId();
	export let label: $$Props["label"] = undefined;
	export let form: $$Props["form"];
	export let name: $$Props["name"];

	const { value, errors } = formFieldProxy(form, name);
</script>

<FormDiv>
	{#if label}
		<FormLabel for={id}>{label}</FormLabel>
	{/if}
	<TextInput {...$$restProps} {id} {name} bind:inputRef bind:value={$value} />
	<FormError errors={$errors} />
</FormDiv>
