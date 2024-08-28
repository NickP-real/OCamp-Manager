import * as staffRepository from "$lib/repositories/staff-repository";
import { selectStaffSchema } from "@db/schema/users";

export async function getCampStaffsByCampId(campId: number) {
	try {
		const staffs = await staffRepository.getStaffsByCampId(campId);
		return selectStaffSchema.array().parse(staffs.map((staff) => staff.staff));
	} catch (error) {
		console.log(error);
	}
}
