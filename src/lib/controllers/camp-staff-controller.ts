import * as staffRepository from "$lib/repositories/staff-repository";
import type { CampStaff } from "@db/schema/camp-staff";
import { selectStaffSchema } from "@db/schema/staff";

export async function getCampStaffsByCampId(campId: CampStaff["campId"]) {
	try {
		const staffs = await staffRepository.getStaffsByCampId(campId);
		return selectStaffSchema.array().parse(staffs.map((staff) => staff.staff));
	} catch (error) {
		console.log(error);
	}
}
