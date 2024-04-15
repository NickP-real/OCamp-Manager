import type { PageServerLoadEvent } from './$types';

export async function load({ parent }: PageServerLoadEvent) {
	return await parent();
}
