import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import {
	selectStaffAccountSchema,
	staffAccount,
	type insertStaffAccountSchema
} from '@db/schema/users';
import { and } from 'drizzle-orm';
import type { z } from 'zod';

type CreateStaffAccountBody = z.infer<typeof insertStaffAccountSchema>;
type UpdateStaffAccountBody = Partial<CreateStaffAccountBody>;

const staffAccountList = selectStaffAccountSchema.array();

const isExist = isExisted(staffAccount.deletedAt);
const hasSameId = isSameId(staffAccount.id);
const hasSameStaffId = isSameId(staffAccount.staffId);

export async function getStaffAccounts() {
	const allStaffAccount = await db.select().from(staffAccount).where(isExist);
	return staffAccountList.parse(allStaffAccount);
}

export async function getStaffAccountById(id: number) {
	const staffAccountData = await db
		.select()
		.from(staffAccount)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(staffAccountData, 'Staff account data is not found');

	return selectStaffAccountSchema.parse(staffAccountData.at(0));
}

export async function getStaffAccountByStaffId(staffId: number) {
	const staffAccountData = await db
		.select()
		.from(staffAccount)
		.where(and(isExist, hasSameStaffId(staffId)))
		.limit(1);
	return staffAccountData.at(0) ? selectStaffAccountSchema.parse(staffAccountData.at(0)) : null;
}

export async function createStaffAccount(data: CreateStaffAccountBody) {
	await db.insert(staffAccount).values(data);
}

export async function updateStaffAccountById(id: number, data: UpdateStaffAccountBody) {
	await db
		.update(staffAccount)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
export async function updateStaffAccountByStaffId(staffId: number, data: UpdateStaffAccountBody) {
	await db
		.update(staffAccount)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameStaffId(staffId)));
}

export async function deleteStaffAccountById(id: number) {
	await db
		.update(staffAccount)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
export async function deleteStaffAccountByStaffId(staffId: number) {
	await db
		.update(staffAccount)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameStaffId(staffId)));
}
