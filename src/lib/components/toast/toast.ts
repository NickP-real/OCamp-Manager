import { writable } from "svelte/store";
import { generateId } from "../utils";

const DEFAULT_DURATION = 5000; // 5 secs

type ToastType = "success" | "error" | "info";

export type Toast = {
	id?: string;
	timeoutId?: ReturnType<typeof setTimeout>;
	type: ToastType;
	duration: number;
	message: string;
};

type ToastDefault = Pick<Toast, "id" | "type" | "duration" | "timeoutId">;

export const toasts = writable<Toast[]>([]);

function addToast(toast: Toast) {
	toasts.update((prev) => [toast, ...prev]);
}

function deleteToast(toastId: Toast["id"]) {
	toasts.update((prev) => prev.filter((toast) => toast.id !== toastId));
}

export function clearToast() {
	toasts.set([]);
}

function autoHideToast(toast: Toast) {
	return setTimeout(() => deleteToast(toast.id), toast.duration);
}

function removeTimeout(toast: Toast) {
	clearTimeout(toast.timeoutId);
	toast.timeoutId = undefined;
}

export function pauseToast(toastId: Toast["id"]) {
	toasts.update((allToast) => {
		const index = allToast.findIndex((toast) => toast.id === toastId);
		if (index !== -1) removeTimeout(allToast[index]);

		return allToast;
	});
}

export function resumeToast(toastId: Toast["id"], duration?: Toast["duration"]) {
	toasts.update((allToast) => {
		const index = allToast.findIndex((toast) => toast.id === toastId);
		if (index !== -1) {
			if (duration) allToast[index].duration = duration;
			allToast[index].timeoutId = autoHideToast(allToast[index]);
		}

		return allToast;
	});
}

export function dismissToast(toastId: Toast["id"]) {
	toasts.update((allToast) => {
		const index = allToast.findIndex((toast) => toast.id === toastId);
		if (index !== -1) {
			removeTimeout(allToast[index]);
			allToast.splice(index, 1);
		}

		return allToast;
	});
}

type ToastArgs = Pick<Toast, "message"> & Partial<Pick<Toast, "duration" | "type">>;

export function toast(body: ToastArgs) {
	const defaults: ToastDefault = { id: generateId(), type: "info", duration: DEFAULT_DURATION };
	const toastData = { ...defaults, ...body };
	toastData.timeoutId = autoHideToast(toastData);
	addToast(toastData);
}

export function toastSuccess(
	message: Toast["message"],
	options?: { duration?: Toast["duration"] }
) {
	toast({ message, type: "success", ...options });
}
