<script lang="ts" generics="T extends Record<string, unknown>, K extends FormPathLeaves<T>">
	import type { HTMLInputAttributes } from "svelte/elements";

	import type { FormFieldProps } from "./type";

	import { dateProxy, formFieldProxy, type FormPathLeaves } from "sveltekit-superforms";
	import FormDiv from "./FormDiv.svelte";
	import FormLabel from "./FormLabel.svelte";
	import FormError from "./FormError.svelte";

	type $$Props = FormFieldProps<T, K, HTMLInputAttributes>;

	export let id: $$Props["id"] = undefined;
	export let name: $$Props["name"];
	export let label: $$Props["label"] = undefined;
	export let form: $$Props["form"];

	const date = dateProxy(form, name, { format: "date" });
	const { errors } = formFieldProxy(form, name);
</script>

<FormDiv>
	{#if label}
		<FormLabel for={id}>{label}</FormLabel>
	{/if}
	<input {...$$restProps} {id} {name} type="date" class="rounded text-black" bind:value={$date} />
	<FormError errors={$errors} />
</FormDiv>
