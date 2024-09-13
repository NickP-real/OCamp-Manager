import { idSchema } from "$lib/utils/params-utils.js";
import { getCampStaffsByCampId } from "@controllers/camp-staff-controller.js";

export const load = async ({ params: { id } }) => {
	const campId = idSchema.parse(id);
	const staffs = getCampStaffsByCampId(campId);
	return { staffs };
};
