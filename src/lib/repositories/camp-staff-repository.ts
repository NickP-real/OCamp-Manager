import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { campStaff, insertCampStaffSchema, selectCampStaffSchema } from '@db/schema/camps';
import { and, eq } from 'drizzle-orm';
import type { z } from 'zod';

type CreateCampStaffBody = z.infer<typeof insertCampStaffSchema>;
type UpdateCampStaffBody = Partial<CreateCampStaffBody>;

const campStaffList = selectCampStaffSchema.array();

const isExist = isExisted(campStaff.deletedAt);
const hasSameId = isSameId(campStaff.id);

export async function getCampStaffs() {
	const allCampStaffs = await db.select().from(campStaff).where(isExist);
	return campStaffList.parse(allCampStaffs);
}

export async function getCampStaffById(id: number) {
	const campStaffData = await db
		.select()
		.from(campStaff)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(campStaffData, 'Camp staff data is not found');

	return selectCampStaffSchema.parse(campStaffData.at(0));
}

export async function getCampStaffsByCampId(campId: number) {
	const allCampStaffs = await db
		.select()
		.from(campStaff)
		.where(and(isExist, eq(campStaff.campId, campId)));
	return campStaffList.parse(allCampStaffs);
}

export async function createCampStaff(data: CreateCampStaffBody) {
	await db.insert(campStaff).values(data);
}

export async function updateCampStaffById(id: number, data: UpdateCampStaffBody) {
	await db
		.update(campStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteCampStaffById(id: number) {
	await db
		.update(campStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
