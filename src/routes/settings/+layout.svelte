<script lang="ts">
	import type { Route } from "$lib/components/navigation-bar/navbar.types";
	import SideNavbar from "$lib/components/navigation-bar/SideNavbar.svelte";

	const routes: Route[] = [
		{
			href: "/settings/majors",
			title: "Majors"
		}
	];
</script>

<div class="flex">
	<SideNavbar {routes} />
	<div class="container mx-auto">
		<slot />
	</div>
</div>
