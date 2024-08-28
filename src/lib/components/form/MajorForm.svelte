<script lang="ts">
	import type { MajorFormSchema } from "$lib/client/form/major-form";
	import * as Form from "$lib/components/form-ui";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import type { FormMode } from "./type";

	export let mode: FormMode = "create";
	export let formData: SuperValidated<Infer<MajorFormSchema>>;

	const form = superForm(formData);
	const { enhance } = form;
</script>

<form method="post" use:enhance class="space-y-4">
	<Form.Title>
		{#if mode === "create"}
			Create Major
		{:else}
			Update Major
		{/if}
	</Form.Title>

	<Form.Input id="name" name="name" label="Major name" {form} />

	<section class="ml-auto space-x-4">
		<button type="submit" class="capitalize">{mode}</button>
	</section>
</form>
