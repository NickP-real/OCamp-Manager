<script lang="ts">
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { type CampFormBody, type CampFormResponse } from '$lib/client/form/camp-form';
	import Form from '@components/ui/Form.svelte';

	export let formData: SuperValidated<CampFormResponse, never, CampFormBody>;
	export let mode: 'create' | 'update' = 'create';
	const { form } = superForm(formData);
</script>

<Form class="flex flex-col gap-2" method="post" let:F>
	<svelte:fragment slot="title">
		{#if mode === 'create'}
			Create camp
		{:else}
			Update camp
		{/if}
	</svelte:fragment>

	<F.Label forId="name">Camp name</F.Label>
	<F.Input id="name" name="name" bind:value={$form.name} />

	<F.Row>
		<F.Column>
			<F.Label forId="start-date">Start date</F.Label>
			<F.DateInput id="start-date" name="fromDate" bind:value={$form.fromDate} />
		</F.Column>
		<F.Column>
			<F.Label forId="end-date">End date</F.Label>
			<F.DateInput id="end-date" name="toDate" bind:value={$form.toDate} />
		</F.Column>
	</F.Row>

	<F.Label forId="description">Description</F.Label>
	<F.TextArea id="description" name="description" bind:value={$form.description} />

	<section class="space-y-2">
		<F.Checkbox id="has-laundry" name="hasLaundry" bind:checked={$form.hasLaundry} />
		<F.Label forId="has-laundry">Has laundry</F.Label>

		{#if $form.hasLaundry}
			<div class="flex flex-col gap-2">
				<F.Label forId="laundry-price">Laundry price (THB)</F.Label>
				<F.Input
					id="laundry-price"
					name="laundryPrice"
					bind:value={$form.laundryPrice}
					disabled={!$form.hasLaundry}
				/>
			</div>
		{/if}
	</section>

	<section class="ml-auto space-x-4">
		<button type="button" on:click={() => history.back()}>Cancel</button>
		<button type="submit">
			{#if mode === 'create'}
				Create
			{:else}
				Update
			{/if}
		</button>
	</section>
</Form>
