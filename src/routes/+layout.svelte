<script>
	import '../app.css';
	import NavigationBar from '../components/NavigationBar.svelte';
</script>

<div class="text-white bg-black min-h-dvh">
	<div class="border-b border-b-white">
		<NavigationBar />
	</div>

	<main>
		<slot />
	</main>
</div>
