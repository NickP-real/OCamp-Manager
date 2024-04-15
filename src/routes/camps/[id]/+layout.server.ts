import { getCampById } from '@controller/camp-controller';
import type { LayoutServerLoadEvent } from './$types';

export async function load({ params }: LayoutServerLoadEvent) {
	const campData = await getCampById(+params.id);
	return { camp: campData };
}
