<script lang="ts">
	export let id: string;
	export let name: string;
	export let checked: boolean | undefined;
</script>

<input {id} {name} type="checkbox" class="rounded border" bind:checked />
