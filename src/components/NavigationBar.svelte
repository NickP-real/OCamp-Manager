<script lang="ts">
	import { page } from '$app/stores';
	const pathName = $page.url.pathname;
</script>

<nav class="grid grid-cols-3 items-center px-4 mx-auto max-w-screen-lg h-14">
	<section>
		<span>logo</span>
	</section>
	<section class="justify-self-center">
		<ul class="flex gap-4">
			<li><a href="/camps" class:font-bold={pathName.includes('/camps')}>Camps</a></li>
			<li><a href="/staffs" class:font-bold={pathName.includes('/staffs')}>Staffs</a></li>
			<li><a href="/settings" class:font-bold={pathName.includes('/settings')}>Settings</a></li>
		</ul>
	</section>
	<section class="justify-self-end">user things here</section>
</nav>
