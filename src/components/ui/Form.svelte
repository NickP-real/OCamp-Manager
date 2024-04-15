<script lang="ts">
	import type { HTMLFormAttributes } from 'svelte/elements';
	import Label from './FormLabel.svelte';
	import Input from './FormInput.svelte';
	import Row from './FormRow.svelte';
	import Column from './FormColumn.svelte';
	import DateInput from './FormDateInput.svelte';
	import TextArea from './FormTextArea.svelte';
	import Checkbox from './FormCheckbox.svelte';

	interface $$Props extends HTMLFormAttributes {}

	const F = { Label, Input, Row, Column, DateInput, TextArea, Checkbox };
</script>

<h1 class="my-4 text-2xl font-bold">
	<slot name="title" />
</h1>

<form {...$$restProps}>
	<slot {F} />
</form>
