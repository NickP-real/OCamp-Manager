<script lang="ts">
	import {
		participantFormSchema,
		type ParticipantFormSchema
	} from "$lib/client/form/participant-form";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/form-ui";
	import { sexEnum } from "@db/schema/enums";
	import type { FormMode } from "./type";

	export let mode: FormMode = "create";
	export let formData: SuperValidated<Infer<ParticipantFormSchema>>;

	const form = superForm(formData, { validators: zodClient(participantFormSchema) });
	const { enhance } = form;
</script>

<form method="post" use:enhance class="space-y-4">
	<Form.Title>
		{#if mode === "create"}
			Create Participant
		{:else}
			Update Participant
		{/if}
	</Form.Title>

	<Form.Input id="firstname" name="firstName" label="First name" {form} />
	<Form.Input id="lastname" name="lastName" label="Last name" {form} />
	<Form.Input id="nickname" name="nickname" label="Nickname" {form} />
	<Form.DateInput id="birthday" name="birthday" label="Birthday" {form} />
	<Form.Input id="phone" name="phone" label="Phone number" {form} />
	<Form.Legend>Sex</Form.Legend>
	<Form.Row>
		{#each sexEnum.enumValues as sex}
			<div class="space-x-2">
				<Form.Radio id={sex} name="sex" value={sex} {form} label={sex} />
			</div>
		{/each}
	</Form.Row>

	<Form.TextArea id="additional-info" name="additionalInfo" label="Additional information" {form} />

	<section class="flex justify-end gap-4">
		<button type="button" on:click={() => history.back()}>Cancel</button>
		<button type="submit" class="capitalize">{mode}</button>
	</section>
</form>
