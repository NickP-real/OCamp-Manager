import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import {
	type CreateRoomLaundryItem,
	type RoomLaundryItem,
	roomLaundryItem,
	selectRoomLaundryItemSchema
} from "@db/schema/room-laundry-item";

import { and, eq } from "drizzle-orm";

type UpdateRoomLaundryItemBody = Partial<CreateRoomLaundryItem>;

const isExist = isExisted(roomLaundryItem.deletedAt);

const roomLaundryItemList = selectRoomLaundryItemSchema.array();

export async function getAll() {
	const allRoomLaundryItems = await db.select().from(roomLaundryItem).where(isExist);
	return roomLaundryItemList.parse(allRoomLaundryItems);
}

export async function getRoomLaundryItemById(id: RoomLaundryItem["id"]) {
	const roomLaundryItemData = await db
		.select()
		.from(roomLaundryItem)
		.where(and(isExist, eq(roomLaundryItem.id, id)))
		.limit(1);

	ifEmptyThrowError(roomLaundryItemData, "Room laundry item data is not found");

	return selectRoomLaundryItemSchema.parse(roomLaundryItemData.at(0));
}

export async function getRoomLaundryItemsByRoomId(roomId: RoomLaundryItem["roomId"]) {
	const allRoomLaundryItems = await db
		.select()
		.from(roomLaundryItem)
		.where(and(isExist, eq(roomLaundryItem.roomId, roomId)));
	return roomLaundryItemList.parse(allRoomLaundryItems);
}

export async function createRoomLaundryItem(data: CreateRoomLaundryItem) {
	await db.insert(roomLaundryItem).values(data);
}

export async function createRoomLaundryItems(data: CreateRoomLaundryItem[]) {
	await db.insert(roomLaundryItem).values(data);
}

export async function updateRoomLaundryItemById(id: string, data: UpdateRoomLaundryItemBody) {
	await db
		.update(roomLaundryItem)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomLaundryItem.id, id)));
}

export async function updateRoomLaundryItemsByRoomId(
	roomId: string,
	data: CreateRoomLaundryItem[]
) {
	await db.transaction(async (tx) => {
		await tx.delete(roomLaundryItem).where(and(isExist, eq(roomLaundryItem.roomId, roomId)));
		await tx.insert(roomLaundryItem).values(data);
	});
}

export async function deleteRoomLaundryItemById(id: RoomLaundryItem["id"]) {
	await db
		.update(roomLaundryItem)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomLaundryItem.id, id)));
}

export async function deleteRoomLaundryItemsByRoomId(roomId: RoomLaundryItem["roomId"]) {
	await db
		.update(roomLaundryItem)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomLaundryItem.roomId, roomId)));
}
