<script lang="ts">
	import { formatDate } from '$lib/client/utils/date-util';

	export let data;
	const { id, name, fromDate, toDate, description, hasLaundry, laundryPrice } = data.camp;
</script>

<h1 class="mb-4 font-bold">Camp Information</h1>

<section class="space-y-2">
	<h2>Name</h2>
	{name}
	<div>
		<h2>Date</h2>
		{formatDate(fromDate)}
		{formatDate(toDate)}
	</div>
	<div>
		<h2>Description</h2>
		<p>
			{description}
		</p>
	</div>
	{#if hasLaundry}
		Has laundry, price: {laundryPrice} THB
	{/if}
</section>

<a href="/camps/{id}/update">Update</a>
