import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import { campStaff } from "@db/schema/camp-staff";
import { selectStaffSchema, staff, type CreateStaff } from "@db/schema/staff";
import { and, eq } from "drizzle-orm";

const isExist = isExisted(staff.deletedAt);

export async function getStaffs() {
	return await db.select().from(staff).where(isExist);
}

export async function getStaffById(id: string) {
	const staffData = await db
		.select()
		.from(staff)
		.where(and(isExist, eq(staff.id, id)))
		.limit(1);

	ifEmptyThrowError(staffData, "Staff data is not found");

	return selectStaffSchema.parse(staffData.at(0));
}

export async function getStaffsByCampId(campId: string, tx = db) {
	return await tx
		.select({ staff })
		.from(staff)
		.rightJoin(campStaff, eq(staff.id, campStaff.staffId))
		.where(and(isExist, eq(campStaff.campId, campId)));
}

export async function createStaff(data: CreateStaff) {
	await db.insert(staff).values(data);
}

export async function updateStaffById(id: string, data: CreateStaff) {
	await db
		.update(staff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(staff.id, id)));
}
export async function deleteStaffById(id: string) {
	await db
		.update(staff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(staff.id, id)));
}
