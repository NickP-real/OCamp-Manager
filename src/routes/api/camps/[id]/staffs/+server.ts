import { idSchema } from "$lib/utils/params-utils.js";
import { getCampStaffsByCampId } from "@controllers/camp-staff-controller.js";
import { json } from "@sveltejs/kit";

export async function GET({ params: { id } }) {
	try {
		const campId = idSchema.parse(id);
		const staffs = await getCampStaffsByCampId(campId);
		return json(staffs);
	} catch (error) {
		return new Response("there is an error occured", { status: 500 });
	}
}
