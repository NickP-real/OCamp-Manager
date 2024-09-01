<script
	lang="ts"
	generics="T extends Record<string, unknown>, K extends FormPathLeaves<T, boolean>"
>
	import Checkbox from "../ui/Checkbox.svelte";

	import type { HTMLInputAttributes } from "svelte/elements";

	import type { FormFieldProps, WithLabel } from "./type";

	import { formFieldProxy, type FormFieldProxy, type FormPathLeaves } from "sveltekit-superforms";
	import FormLabel from "./FormLabel.svelte";

	type $$Props = FormFieldProps<T, K, HTMLInputAttributes> & WithLabel;

	export let form: $$Props["form"];
	export let name: $$Props["name"];
	export let label: $$Props["label"];

	const { value } = formFieldProxy(form, name) satisfies FormFieldProxy<boolean>;
</script>

<FormLabel class="flex items-center gap-2">
	<Checkbox {name} bind:checked={$value} />
	<span>{label}</span>
</FormLabel>
