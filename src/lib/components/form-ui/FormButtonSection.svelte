<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined = undefined;
	export { className as class };
</script>

<section class={cn("flex justify-end space-x-4", className)}>
	<slot />
</section>
