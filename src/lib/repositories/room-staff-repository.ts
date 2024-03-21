import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { roomStaff, selectRoomStaffSchema, type insertRoomStaffSchema } from '@db/schema/rooms';
import { and } from 'drizzle-orm';
import type { z } from 'zod';

type CreateRoomStaffBody = z.infer<typeof insertRoomStaffSchema>;
type UpdateRoomStaffBody = Partial<CreateRoomStaffBody>;

const roomStaffList = selectRoomStaffSchema.array();

const isExist = isExisted(roomStaff.deletedAt);
const hasSameId = isSameId(roomStaff.id);
const hasSameRoomId = isSameId(roomStaff.roomId);
const hasSameCampStaffId = isSameId(roomStaff.campStaffId);

export async function getRoomStaffs() {
	const allRoomStaffs = await db.select().from(roomStaff).where(isExist);
	return roomStaffList.array().parse(allRoomStaffs);
}

export async function getRoomStaffById(id: number) {
	const roomStaffData = await db
		.select()
		.from(roomStaff)
		.where(and(isExist, hasSameId(id)));

	ifEmptyThrowError(roomStaffData, 'Room staff data is not found');

	return selectRoomStaffSchema.parse(roomStaffData.at(0));
}

export async function getRoomStaffByRoomId(roomId: number) {
	const roomStaffData = await db
		.select()
		.from(roomStaff)
		.where(and(isExist, hasSameRoomId(roomId)))
		.limit(1);
	return roomStaffData.at(0) ? selectRoomStaffSchema.parse(roomStaffData.at(0)) : null;
}

export async function getRoomStaffByCampStaffId(campStaffId: number) {
	const roomStaffData = await db
		.select()
		.from(roomStaff)
		.where(and(isExist, hasSameCampStaffId(campStaffId)))
		.limit(1);
	return roomStaffData.at(0) ? selectRoomStaffSchema.parse(roomStaffData.at(0)) : null;
}

export async function createRoomStaff(data: CreateRoomStaffBody) {
	await db.insert(roomStaff).values(data);
}

export async function createRoomStaffs(data: CreateRoomStaffBody[]) {
	await db.insert(roomStaff).values(data);
}

export async function updateRoomStaffById(id: number, data: UpdateRoomStaffBody) {
	await db
		.update(roomStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function updateRoomStaffByRoomId(roomId: number, data: UpdateRoomStaffBody) {
	await db
		.update(roomStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameRoomId(roomId)));
}

export async function updateRoomStaffByCampStaffId(campStaffId: number, data: UpdateRoomStaffBody) {
	await db
		.update(roomStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameCampStaffId(campStaffId)));
}

export async function deleteRoomStaffById(id: number) {
	await db
		.update(roomStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteRoomStaffByRoomId(roomId: number) {
	await db
		.update(roomStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameRoomId(roomId)));
}

export async function deleteRoomStaffByCampStaffId(campStaffId: number) {
	await db
		.update(roomStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameCampStaffId(campStaffId)));
}
