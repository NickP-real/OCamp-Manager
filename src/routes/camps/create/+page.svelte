<script lang="ts">
	import { superForm } from 'sveltekit-superforms';

	export let data;
	const { form } = superForm(data.form);
</script>

<h1 class="my-4 text-2xl font-bold">Create camp</h1>

<form class="flex flex-col gap-2" method="POST">
	<label for="name">Camp name</label>
	<input
		id="name"
		name="name"
		class="py-1 px-2 text-black rounded border"
		bind:value={$form.name}
	/>

	<section class="flex gap-4">
		<div class="flex flex-col gap-2 w-full">
			<label for="start-date">Start date</label>
			<input
				id="start-date"
				name="fromDate"
				type="date"
				class="py-1 px-2 text-black rounded border"
				bind:value={$form.fromDate}
			/>
		</div>

		<div class="flex flex-col gap-2 w-full">
			<label for="end-date">End date</label>
			<input
				id="end-date"
				name="toDate"
				type="date"
				class="py-1 px-2 text-black rounded border"
				bind:value={$form.toDate}
			/>
		</div>
	</section>

	<label for="description">Description</label>
	<textarea
		id="description"
		name="description"
		rows="3"
		class="py-1 px-2 text-black rounded border"
		bind:value={$form.description}
	/>

	<section class="space-y-2">
		<input
			id="has-laundry"
			name="hasLaundry"
			type="checkbox"
			class="rounded border"
			bind:checked={$form.hasLaundry}
		/>
		<label for="has-laundry">Has laundry</label>

		{#if $form.hasLaundry}
			<div class="flex flex-col gap-2">
				<label for="laundry-price">Laundry price (THB)</label>
				<input
					id="laundry-price"
					name="laundryPrice"
					type="number"
					class="py-1 px-2 text-black rounded border"
					bind:value={$form.laundryPrice}
					disabled={!$form.hasLaundry}
				/>
			</div>
		{/if}
	</section>

	<div class="ml-auto space-x-4">
		<button type="button" on:click={() => history.back()}>Cancel</button>
		<button type="submit">Create</button>
	</div>
</form>
