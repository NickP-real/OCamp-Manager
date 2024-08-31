import { getAll } from "@controller/camp-controller";

export async function load() {
	return {
		camps: getAll()
	};
}
