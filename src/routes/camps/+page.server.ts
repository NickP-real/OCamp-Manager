import { getAllCamps } from '@controller/camp-controller';

export async function load() {
	return {
		camps: await getAllCamps()
	};
}
