<script lang="ts">
	import type { Route } from "./navbar.types";

	export let routes: Route[];
</script>

<nav>
	<ul>
		{#each routes as route (route.title)}
			{#if !route.disabled}
				<li>
					<a href={route.href} class="capitalize">{route.title}</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>
