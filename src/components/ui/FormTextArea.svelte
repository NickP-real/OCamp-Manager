<script lang="ts">
	export let id: string;
	export let name: string;
	export let value: string;
	export let rows: number = 3;
</script>

<textarea {id} {name} {rows} class="py-1 px-2 text-black rounded border" bind:value />
