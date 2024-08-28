import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import { roomStaff, selectRoomStaffSchema, type CreateRoomStaff } from "@db/schema/rooms";
import { and, eq } from "drizzle-orm";

type UpdateRoomStaffBody = Partial<CreateRoomStaff>;

const roomStaffList = selectRoomStaffSchema.array();

const isExist = isExisted(roomStaff.deletedAt);

export async function getRoomStaffs() {
	const allRoomStaffs = await db.select().from(roomStaff).where(isExist);
	return roomStaffList.array().parse(allRoomStaffs);
}

export async function getRoomStaffById(id: number) {
	const roomStaffData = await db
		.select()
		.from(roomStaff)
		.where(and(isExist, eq(roomStaff.id, id)));

	ifEmptyThrowError(roomStaffData, "Room staff data is not found");

	return selectRoomStaffSchema.parse(roomStaffData.at(0));
}

export async function getRoomStaffByRoomId(roomId: number) {
	const roomStaffData = await db
		.select()
		.from(roomStaff)
		.where(and(isExist, eq(roomStaff.roomId, roomId)))
		.limit(1);
	return roomStaffData.at(0) ? selectRoomStaffSchema.parse(roomStaffData.at(0)) : null;
}

export async function getRoomStaffByCampStaffId(campStaffId: number) {
	const roomStaffData = await db
		.select()
		.from(roomStaff)
		.where(and(isExist, eq(roomStaff.campStaffId, campStaffId)))
		.limit(1);
	return roomStaffData.at(0) ? selectRoomStaffSchema.parse(roomStaffData.at(0)) : null;
}

export async function createRoomStaff(data: CreateRoomStaff) {
	await db.insert(roomStaff).values(data);
}

export async function createRoomStaffs(data: CreateRoomStaff[]) {
	await db.insert(roomStaff).values(data);
}

export async function updateRoomStaffById(id: number, data: UpdateRoomStaffBody) {
	await db
		.update(roomStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomStaff.id, id)));
}

export async function updateRoomStaffByRoomId(roomId: number, data: UpdateRoomStaffBody) {
	await db
		.update(roomStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomStaff.roomId, roomId)));
}

export async function updateRoomStaffByCampStaffId(campStaffId: number, data: UpdateRoomStaffBody) {
	await db
		.update(roomStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomStaff.campStaffId, campStaffId)));
}

export async function deleteRoomStaffById(id: number) {
	await db
		.update(roomStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomStaff.id, id)));
}

export async function deleteRoomStaffByRoomId(roomId: number) {
	await db
		.update(roomStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomStaff.roomId, roomId)));
}

export async function deleteRoomStaffByCampStaffId(campStaffId: number) {
	await db
		.update(roomStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomStaff.campStaffId, campStaffId)));
}
