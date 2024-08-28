import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import {
	roomLaundryItem,
	selectRoomLaundryItemSchema,
	type CreateRoomLaundryItem
} from "@db/schema/laundries";
import { and, eq } from "drizzle-orm";

type UpdateRoomLaundryItemBody = Partial<CreateRoomLaundryItem>;

const isExist = isExisted(roomLaundryItem.deletedAt);

const roomLaundryItemList = selectRoomLaundryItemSchema.array();

export async function getRoomLaundryItems() {
	const allRoomLaundryItems = await db.select().from(roomLaundryItem).where(isExist);
	return roomLaundryItemList.parse(allRoomLaundryItems);
}

export async function getRoomLaundryItemById(id: number) {
	const roomLaundryItemData = await db
		.select()
		.from(roomLaundryItem)
		.where(and(isExist, eq(roomLaundryItem.id, id)))
		.limit(1);

	ifEmptyThrowError(roomLaundryItemData, "Room laundry item data is not found");

	return selectRoomLaundryItemSchema.parse(roomLaundryItemData.at(0));
}

export async function getRoomLaundryItemsByRoomId(roomId: number) {
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

export async function updateRoomLaundryItemById(id: number, data: UpdateRoomLaundryItemBody) {
	await db
		.update(roomLaundryItem)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(roomLaundryItem.id, id)));
}

export async function updateRoomLaundryItemsByRoomId(
	roomId: number,
	data: CreateRoomLaundryItem[]
) {
	await db.transaction(async (tx) => {
		await tx.delete(roomLaundryItem).where(and(isExist, eq(roomLaundryItem.roomId, roomId)));
		await tx.insert(roomLaundryItem).values(data);
	});
}

export async function deleteRoomLaundryItemById(id: number) {
	await db
		.update(roomLaundryItem)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomLaundryItem.id, id)));
}

export async function deleteRoomLaundryItemsByRoomId(roomId: number) {
	await db
		.update(roomLaundryItem)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(roomLaundryItem.roomId, roomId)));
}
