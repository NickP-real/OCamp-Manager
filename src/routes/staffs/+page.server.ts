import { getAllStaffs } from "@controllers/staff-controller";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const staffs = await getAllStaffs();

	return { staffs };
};
