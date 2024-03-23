import { getCampById } from '@controller/camp-controller';
import type { PageServerLoadEvent } from './$types';

export async function load({ params }: PageServerLoadEvent) {
	const campData = await getCampById(+params.id);
	return { data: campData };
}
