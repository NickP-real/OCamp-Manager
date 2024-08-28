<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<div class={cn("flex w-max items-center gap-1 rounded-full bg-neutral-200 px-2 py-1", className)}>
	<slot />
	<slot name="end-content" />
</div>
