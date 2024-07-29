<script lang="ts">
	export let errors: string[] | undefined = undefined;
</script>

{#if errors}
	<div class="text-red-500">{errors}</div>
{/if}
