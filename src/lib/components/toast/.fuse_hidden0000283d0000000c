import { linear } from "svelte/easing";
import { tweened } from "svelte/motion";
import { get } from "svelte/store";

type ProgressFrom = "ltr" | "rtl";

const INTITIAL = 100;
const END = 0;
const DEFAULT_DURATION = 3000;

export function createProgress(from: ProgressFrom, duration: number = DEFAULT_DURATION) {
	const initial = from === "ltr" ? END : INTITIAL;
	const end = from === "ltr" ? INTITIAL : END;
	const store = tweened(initial, { duration, easing: linear });

	function getCurrentProgress() {
		return get(store);
	}

	function getCurrentDuration() {
		const currentProgress = getCurrentProgress();
		const progress = from === "ltr" ? end - currentProgress : currentProgress;
		return (progress * duration) / 100;
	}

	function pause() {
		store.set(getCurrentProgress(), { duration: 0 });
	}

	function play() {
		store.set(end, { duration: getCurrentDuration(), easing: linear });
	}

	function reset() {
		store.set(initial, { duration: 0 });
	}

	return { store, pause, play, reset, getCurrentDuration };
}
