import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import {
	type CreateRoomStaff,
	selectRoomStaffSchema,
	roomStaff,
	type RoomStaff
} from "@db/schema/room-staff";

import { and, eq } from "drizzle-orm";

type UpdateRoomStaffBody = Partial<CreateRoomStaff>;

const roomStaffList = selectRoomStaffSchema.array();

const isExist = isExisted(roomStaff.deletedAt);

export async function getAll() {
	const allRoomStaffs = await db.select().from(roomStaff).where(isExist);
	return roomStaffList.array().parse(allRoomStaffs);
}

export async function getRoomStaffById(id: RoomStaff["id"]) {
	const roomStaffData = await db
		.select()
		.from(roomStaff)
		.where(and(isExist, eq(roomStaff.id, id)));

	ifEmptyThrowError(roomStaffData, "Room staff data is not found");

	return selectRoomStaffSchema.parse(roomStaffData.at(0));
}

export async function getRoomStaffByRoomId(roomId: RoomStaff["roomId"]) {
	const roomStaffData = await db
		.select()
		.from(roomStaff)
		.where(and(isExist, eq(roomStaff.roomId, roomId)))
		.limit(1);
	return roomStaffData.at(0) ? selectRoomStaffSchema.parse(roomStaffData.at(0)) : null;
}

export async function getRoomStaffByCampStaffId(campStaffId: RoomStaff["campStaffId"]) {
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

export async function updateRoomStaffById(id: RoomStaff["id"], data: UpdateRoomStaffBody) {
	await db
		.update(roomStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomStaff.id, id)));
}

export async function updateRoomStaffByRoomId(
	roomId: RoomStaff["roomId"],
	data: UpdateRoomStaffBody
) {
	await db
		.update(roomStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomStaff.roomId, roomId)));
}

export async function updateRoomStaffByCampStaffId(
	campStaffId: RoomStaff["campStaffId"],
	data: UpdateRoomStaffBody
) {
	await db
		.update(roomStaff)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomStaff.campStaffId, campStaffId)));
}

export async function deleteRoomStaffById(id: RoomStaff["id"]) {
	await db
		.update(roomStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomStaff.id, id)));
}

export async function deleteRoomStaffByRoomId(roomId: RoomStaff["roomId"]) {
	await db
		.update(roomStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomStaff.roomId, roomId)));
}

export async function deleteRoomStaffByCampStaffId(campStaffId: RoomStaff["campStaffId"]) {
	await db
		.update(roomStaff)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomStaff.campStaffId, campStaffId)));
}
