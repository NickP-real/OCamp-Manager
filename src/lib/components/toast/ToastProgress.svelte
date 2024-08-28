<script lang="ts">
	import type { Toast } from "./toast";

	export let percent: number;
	export let type: Toast["type"];
</script>

<div style="width: {percent}%;" class="absolute inset-x-0 bottom-0 h-2 bg-green-400"></div>
