<script lang="ts">
	import type { Route } from "$lib/components/navigation-bar/navbar.types";
	import SideNavbar from "$lib/components/navigation-bar/SideNavbar.svelte";
	import type { LayoutServerData } from "./$types";

	export let data: LayoutServerData;
	const { id, hasLaundry } = data.camp;
	const route = `/camps/${id}`;

	const routes: Route[] = [
		{
			href: `${route}`,
			title: "Info"
		},
		{
			href: `${route}/participants`,
			title: "Participants"
		},
		{
			href: `${route}/staffs`,
			title: "staffs"
		},
		{
			href: `${route}/rooms`,
			title: "Rooms"
		},
		{
			href: `${route}/laundry`,
			title: "Laundry",
			disabled: !hasLaundry
		}
	];
</script>

<div class="flex">
	<SideNavbar {routes} />
	<section class="container mx-auto">
		<slot />
	</section>
</div>
