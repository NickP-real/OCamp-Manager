import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import {
	roomLaundryItem,
	selectRoomLaundryItemSchema,
	type insertRoomLaundryItemSchema
} from '@db/schema/laundries';
import { and } from 'drizzle-orm';
import type { z } from 'zod';

type CreateRoomLaundryItemBody = z.infer<typeof insertRoomLaundryItemSchema>;
type UpdateRoomLaundryItemBody = Partial<CreateRoomLaundryItemBody>;

const isExist = isExisted(roomLaundryItem.deletedAt);
const hasSameId = isSameId(roomLaundryItem.id);
const hasSameRoomId = isSameId(roomLaundryItem.roomId);

const roomLaundryItemList = selectRoomLaundryItemSchema.array();

export async function getRoomLaundryItems() {
	const allRoomLaundryItems = await db.select().from(roomLaundryItem).where(isExist);
	return roomLaundryItemList.parse(allRoomLaundryItems);
}

export async function getRoomLaundryItemById(id: number) {
	const roomLaundryItemData = await db
		.select()
		.from(roomLaundryItem)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(roomLaundryItemData, 'Room laundry item data is not found');

	return selectRoomLaundryItemSchema.parse(roomLaundryItemData.at(0));
}

export async function getRoomLaundryItemsByRoomId(roomId: number) {
	const allRoomLaundryItems = await db
		.select()
		.from(roomLaundryItem)
		.where(and(isExist, hasSameRoomId(roomId)));
	return roomLaundryItemList.parse(allRoomLaundryItems);
}

export async function createRoomLaundryItem(data: CreateRoomLaundryItemBody) {
	await db.insert(roomLaundryItem).values(data);
}

export async function createRoomLaundryItems(data: CreateRoomLaundryItemBody[]) {
	await db.insert(roomLaundryItem).values(data);
}

export async function updateRoomLaundryItemById(id: number, data: UpdateRoomLaundryItemBody) {
	await db
		.update(roomLaundryItem)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function updateRoomLaundryItemsByRoomId(
	roomId: number,
	data: CreateRoomLaundryItemBody[]
) {
	await db.transaction(async (tx) => {
		await tx.delete(roomLaundryItem).where(and(isExist, hasSameRoomId(roomId)));
		await tx.insert(roomLaundryItem).values(data);
	});
}

export async function deleteRoomLaundryItemById(id: number) {
	await db
		.update(roomLaundryItem)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteRoomLaundryItemsByRoomId(roomId: number) {
	await db
		.update(roomLaundryItem)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameRoomId(roomId)));
}
