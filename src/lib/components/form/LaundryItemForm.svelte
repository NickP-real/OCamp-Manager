<script lang="ts">
	import { laundryItemSchema, type LaundryItemSchema } from "$lib/client/form/laundry-item-form";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/form-ui";
	import type { FormMode } from "./type";

	export let mode: FormMode = "create";
	export let formData: SuperValidated<Infer<LaundryItemSchema>>;

	const form = superForm(formData, { validators: zodClient(laundryItemSchema) });
	const { enhance } = form;
</script>

<form method="post" use:enhance>
	<Form.Title>
		{#if mode === "create"}
			Create Laundry Item
		{:else}
			Update Laundry Item
		{/if}
	</Form.Title>

	<Form.Input id="name" name="name" label="Name" {form} />

	<div>
		<a href="/settings/laundry-items">Cancel</a>
		<button type="submit" class="capitalize">{mode}</button>
	</div>
</form>
