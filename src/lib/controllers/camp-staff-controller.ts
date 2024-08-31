import * as staffRepository from "$lib/repositories/staff-repository";
import { selectStaffSchema } from "@db/schema/staff";

export async function getCampStaffsByCampId(campId: string) {
	try {
		const staffs = await staffRepository.getStaffsByCampId(campId);
		return selectStaffSchema.array().parse(staffs.map((staff) => staff.staff));
	} catch (error) {
		console.log(error);
	}
}
