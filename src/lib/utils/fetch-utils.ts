const DEFAULT_TIMEOUT = 300;

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
	callback: T,
	wait = DEFAULT_TIMEOUT
) {
	let timeout: ReturnType<typeof setTimeout>;

	return function (...args: Parameters<T>) {
		clearTimeout(timeout);
		timeout = setTimeout(() => callback(...args), wait);
	};
}

interface TypedResponse<T> extends Response {
	json(): Promise<T>;
}

type RequestInput = RequestInfo | URL;

declare function fetch<ResponseType = unknown>(
	input: RequestInput,
	options?: RequestInit
): Promise<TypedResponse<ResponseType>>;

// fetch wrapper
export async function api<T = unknown>(url: RequestInput, options?: RequestInit) {
	return await fetch<T>(url, options);
}
