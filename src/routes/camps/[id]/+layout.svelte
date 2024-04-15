<script lang="ts">
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;
	const { id, hasLaundry } = data.camp;
	const route = `/camps/${id}`;
</script>

<div class="flex">
	<nav>
		<ul>
			<li>
				<a href={route}>Info</a>
			</li>
			<li>
				<a href="{route}/staffs">Staffs</a>
			</li>
			<li>
				<a href="{route}/participants">Participants</a>
			</li>
			<li>
				<a href="{route}/rooms">Rooms</a>
			</li>
			{#if hasLaundry}
				<li>
					<a href="{route}/laundry">Laundry</a>
				</li>
			{/if}
		</ul>
	</nav>
	<section>
		<slot />
	</section>
</div>
