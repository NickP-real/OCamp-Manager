import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { insertRoomSchema, room, selectRoomSchema } from '@db/schema/rooms';
import { and } from 'drizzle-orm';
import type { z } from 'zod';

type CreateRoomBody = z.infer<typeof insertRoomSchema>;
type UpdateRoomBody = Partial<CreateRoomBody>;

const roomList = selectRoomSchema.array();

const isExist = isExisted(room.deletedAt);
const hasSameId = isSameId(room.id);

export async function getRooms() {
	const allRooms = await db.select().from(room).where(isExist);
	return roomList.parse(allRooms);
}

export async function getRoomById(id: number) {
	const roomData = await db
		.select()
		.from(room)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(roomData, 'Room data is not found');

	return selectRoomSchema.parse(roomData.at(0));
}

export async function createRoom(data: CreateRoomBody) {
	await db.insert(room).values(data);
}

export async function updateRoomById(id: number, data: UpdateRoomBody) {
	await db
		.update(room)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteRoomById(id: number) {
	await db
		.update(room)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
