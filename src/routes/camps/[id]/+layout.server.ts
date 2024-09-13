import { getCampById } from "@controllers/camp-controller";
import type { LayoutServerLoadEvent } from "./$types";

export async function load({ params }: LayoutServerLoadEvent) {
	const campData = await getCampById(params.id);
	return { camp: campData };
}
