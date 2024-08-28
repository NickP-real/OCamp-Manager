import { getAllMajors } from "@controller/major-controller";

export async function load() {
	return { majors: getAllMajors() };
}
