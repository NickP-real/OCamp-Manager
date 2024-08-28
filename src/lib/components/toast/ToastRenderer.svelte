<script lang="ts">
	import { toasts } from "./toast";
	import Toast from "./Toast.svelte";
</script>

<div class="fixed inset-x-0 mx-auto w-min">
	{#each $toasts as toast (toast.id)}
		<Toast {toast} />
	{/each}
</div>
