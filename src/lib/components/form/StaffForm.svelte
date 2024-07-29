<script lang="ts">
	import * as Form from '$lib/components/form-ui';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import type { FormMode } from './type';
	import { staffFormSchema, type StaffFormSchema } from '$lib/client/form/staff-form';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { goto } from '$app/navigation';

	export let mode: FormMode = 'create';
	export let formData: SuperValidated<Infer<StaffFormSchema>>;

	const form = superForm(formData, {
		validators: zodClient(staffFormSchema),
		onResult: async ({ result }) => {
			if (result.type === 'success') {
				await goto('/staffs');
			}
		}
	});
	const { enhance } = form;
</script>

<form method="post" class="space-y-4" use:enhance>
	<Form.Title>
		{#if mode === 'create'}
			Create Staff
		{:else}
			Update Staff
		{/if}
	</Form.Title>

	<Form.Input id="firstname" name="firstName" label="First name" {form} />
	<Form.Input id="lastname" name="lastName" label="Last name" {form} />
	<Form.Input id="nickname" name="nickname" label="Nick name" {form} />
	<Form.Input id="phone" name="phone" label="Phone number" {form} />
	<Form.DateInput id="birthday" name="birthday" label="Birthday" {form} />
	<Form.TextArea id="additional-info" name="additionalInfo" label="Additional Info" {form} />

	<div class="flex justify-end gap-2">
		<button type="button" on:click={() => history.back()}>Cancel</button>
		<button type="submit" class="capitalize">{mode}</button>
	</div>
</form>
