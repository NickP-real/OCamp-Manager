import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import { campStaff, type CampStaff } from "@db/schema/camp-staff";
import { selectStaffSchema, staff, type CreateStaff, type Staff } from "@db/schema/staff";
import { and, eq } from "drizzle-orm";

const isExist = isExisted(staff.deletedAt);

export async function getAll() {
	return await db.select().from(staff).where(isExist);
}

export async function getStaffById(id: Staff["id"]) {
	const staffData = await db
		.select()
		.from(staff)
		.where(and(isExist, eq(staff.id, id)));

	ifEmptyThrowError(staffData, "Staff data is not found");

	return selectStaffSchema.parse(staffData.at(0));
}

export async function getStaffsByCampId(campId: CampStaff["campId"], tx = db) {
	return await tx
		.select({ staff })
		.from(staff)
		.rightJoin(campStaff, eq(staff.id, campStaff.staffId))
		.where(and(isExist, eq(campStaff.campId, campId)));
}

export async function createStaff(data: CreateStaff) {
	await db.insert(staff).values(data);
}

export async function updateStaffById(id: Staff["id"], data: CreateStaff) {
	await db
		.update(staff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(staff.id, id)));
}
export async function deleteStaffById(id: Staff["id"]) {
	await db
		.update(staff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(staff.id, id)));
}
