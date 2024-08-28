<script>
	import NavigationBar from "$lib/components/navigation-bar/NavigationBar.svelte";
	import ToastRenderer from "$lib/components/toast/ToastRenderer.svelte";
	import "../app.css";
</script>

<svelte:head>
	<title>O-Camp Manager</title>
</svelte:head>

<ToastRenderer />
<div class="min-h-dvh bg-black text-white">
	<div class="border-b border-b-white">
		<NavigationBar />
	</div>

	<main>
		<slot />
	</main>
</div>
