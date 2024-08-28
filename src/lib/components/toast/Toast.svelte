<script lang="ts">
	import { pauseToast, resumeToast, type Toast } from "./toast";
	import { slide } from "svelte/transition";
	import { onMount } from "svelte";
	import { createProgress } from "./progress";
	import ToastProgress from "./ToastProgress.svelte";

	export let toast: Toast;
	const progress = createProgress("rtl", toast.duration);
	const store = progress.store;

	$: percent = $store;

	function onMouseEnter() {
		pauseToast(toast.id);
		progress.pause();
	}

	function onMouseLeave() {
		resumeToast(toast.id, progress.getCurrentDuration());
		progress.play();
	}

	onMount(() => {
		progress.play();
	});
</script>

<div
	class="relative my-2 min-w-56 overflow-hidden rounded-md bg-white p-4 shadow"
	transition:slide|local={{ duration: 300 }}
	role="alertdialog"
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
>
	{toast.message}
	<ToastProgress {percent} type={toast.type} />
</div>
