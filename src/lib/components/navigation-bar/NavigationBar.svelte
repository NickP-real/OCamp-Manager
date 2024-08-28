<script lang="ts">
	import { page } from "$app/stores";
	$: pathName = $page.url.pathname;
</script>

<nav class="grid h-14 grid-cols-3 items-center px-4">
	<section>
		<span>logo</span>
	</section>
	<section class="justify-self-center">
		<ul class="flex gap-4">
			<li><a href="/camps" class:font-bold={pathName.startsWith("/camps")}>Camps</a></li>
			<li><a href="/staffs" class:font-bold={pathName.startsWith("/staffs")}>Staffs</a></li>
			<li><a href="/settings" class:font-bold={pathName.startsWith("/settings")}>Settings</a></li>
		</ul>
	</section>
	<section class="justify-self-end">user things here</section>
</nav>
