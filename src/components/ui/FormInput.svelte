<script lang="ts">
	export let id: string;
	export let name: string;
	export let value: string;
	export let disabled: boolean | undefined = undefined;
</script>

<input {id} {name} class="py-1 px-2 text-black rounded border" bind:value {disabled} />
