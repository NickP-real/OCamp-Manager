import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import { type CreateCampStaff, selectCampStaffSchema, campStaff } from "@db/schema/camp-staff";

import { and, eq } from "drizzle-orm";

type UpdateCampStaffBody = Partial<CreateCampStaff>;

const campStaffList = selectCampStaffSchema.array();

const isExist = isExisted(campStaff.deletedAt);

export async function getCampStaffs() {
	const allCampStaffs = await db.select().from(campStaff).where(isExist);
	return campStaffList.parse(allCampStaffs);
}

export async function getCampStaffById(id: string) {
	const campStaffData = await db
		.select()
		.from(campStaff)
		.where(and(isExist, eq(campStaff.id, id)))
		.limit(1);

	ifEmptyThrowError(campStaffData, "Camp staff data is not found");

	return selectCampStaffSchema.parse(campStaffData.at(0));
}

export async function getCampStaffsByCampId(campId: string) {
	const allCampStaffs = await db
		.select()
		.from(campStaff)
		.where(and(isExist, eq(campStaff.campId, campId)));
	return campStaffList.parse(allCampStaffs);
}

export async function createCampStaff(data: CreateCampStaff) {
	await db.insert(campStaff).values(data);
}

export async function updateCampStaffById(id: string, data: UpdateCampStaffBody) {
	await db
		.update(campStaff)
		.set(data)
		.where(and(isExist, eq(campStaff.id, id)));
}

export async function deleteCampStaffById(id: string) {
	await db
		.update(campStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(campStaff.id, id)));
}
