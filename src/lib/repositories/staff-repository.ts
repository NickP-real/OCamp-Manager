import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { selectStaffSchema, staff, type insertStaffSchema } from '@db/schema/users';
import { and } from 'drizzle-orm';
import type { z } from 'zod';

type CreateStaffBody = z.infer<typeof insertStaffSchema>;
type UpdateStaffBody = Partial<CreateStaffBody>;

const staffAccountList = selectStaffSchema.array();

const isExist = isExisted(staff.deletedAt);
const hasSameId = isSameId(staff.id);

export async function getStaffs() {
	const allStaffs = await db.select().from(staff).where(isExist);
	return staffAccountList.parse(allStaffs);
}

export async function getStaffById(id: number) {
	const staffData = await db
		.select()
		.from(staff)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(staffData, 'Staff data is not found');

	return selectStaffSchema.parse(staffData.at(0));
}

export async function createStaff(data: CreateStaffBody) {
	await db.insert(staff).values(data);
}

export async function updateStaffById(id: number, data: UpdateStaffBody) {
	await db
		.update(staff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
export async function deleteStaffById(id: number) {
	await db
		.update(staff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
