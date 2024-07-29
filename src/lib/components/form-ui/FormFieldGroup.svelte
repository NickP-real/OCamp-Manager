<script lang="ts">
	export let label: string;
</script>

<div class="space-y-2">
	<h2 class="text-xl font-semibold">{label}</h2>
	<div class="space-y-4">
		<slot />
	</div>
</div>
