<script lang="ts" generics="T extends Record<string, unknown>, K extends FormPathLeaves<T>">
	import type { HTMLInputAttributes } from 'svelte/elements';

	import { formFieldProxy, type FormPathLeaves } from 'sveltekit-superforms';

	import type { FormFieldProps, WithLabel } from './type';

	import FormLabel from './FormLabel.svelte';

	type $$Props = FormFieldProps<T, K, HTMLInputAttributes> & WithLabel;

	export let id: $$Props['id'] = undefined;
	export let label: $$Props['label'];
	export let name: $$Props['name'];
	export let form: $$Props['form'];
	export let value: $$Props['value'] = undefined;

	const { value: formValue } = formFieldProxy(form, name);
</script>

<FormLabel {id} class="flex items-center gap-2">
	<input {...$$restProps} type="radio" {id} {name} {value} bind:group={$formValue} />
	<span>{label}</span>
</FormLabel>
