<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex gap-2 items-center mb-4">
	<input class="flex-1" />
	<a href="/camps/create" class="border">New camp</a>
</section>

<section class="grid grid-cols-3">
	{#each data.camps as camp}
		<div class="rounded-md border">
			<a href="/camps/{camp.id}" class="block py-2 px-4 size-full">
				{camp.name}
			</a>
		</div>
	{/each}
</section>
