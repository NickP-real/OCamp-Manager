import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import {
	insertLaundryItemSchema,
	laundryItem,
	selectLaundryItemSchema
} from '@db/schema/laundries';
import { and, like } from 'drizzle-orm';
import { z } from 'zod';

type CreateLaundryItemBody = z.infer<typeof insertLaundryItemSchema>;
type UpdateLaundryItemBody = Partial<CreateLaundryItemBody>;

const isExist = isExisted(laundryItem.deletedAt);
const hasSameId = isSameId(laundryItem.id);

const laundryItemList = selectLaundryItemSchema.array();

export async function getLaundryItems() {
	const allLaundryItems = await db.select().from(laundryItem).where(isExist);
	return laundryItemList.parse(allLaundryItems);
}

export async function getLaundryItemById(id: number) {
	const laundryItemData = await db
		.select()
		.from(laundryItem)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(laundryItemData, 'Laundry item data is not found');

	return selectLaundryItemSchema.parse(laundryItemData.at(0));
}

export async function getLaundryItemByName(name: string) {
	const laundryItemData = await db
		.select()
		.from(laundryItem)
		.where(and(isExist, like(laundryItem.name, name)))
		.limit(1);
	return laundryItemData.at(0) ? selectLaundryItemSchema.parse(laundryItemData.at(0)) : null;
}

export async function createLaundryItem(data: CreateLaundryItemBody) {
	await db.insert(laundryItem).values(data);
}

export async function updateLaundryItemById(id: number, data: UpdateLaundryItemBody) {
	await db
		.update(laundryItem)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteLaundryItemById(id: number) {
	await db
		.update(laundryItem)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
