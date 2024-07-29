<script lang="ts">
	export let data;
	const { camps } = data;
</script>

<div class="container mx-auto">
	<section class="mb-4 flex items-center gap-2">
		<input class="flex-1" />
		<a href="/camps/create" class="border">New camp</a>
	</section>

	<section class="grid grid-cols-3">
		{#await camps}
			<p>Loading camps...</p>
		{:then camps}
			{#each camps as camp}
				<div class="rounded-md border">
					<a href="/camps/{camp.id}" class="block size-full px-4 py-2">
						{camp.name}
					</a>
				</div>
			{/each}
		{/await}
	</section>
</div>
