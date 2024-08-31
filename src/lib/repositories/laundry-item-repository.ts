import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import {
	laundryItem,
	selectLaundryItemSchema,
	type CreateLaundryItem
} from "@db/schema/laundry-item";
import { and, eq, like } from "drizzle-orm";

type UpdateLaundryItemBody = Partial<CreateLaundryItem>;

const isExist = isExisted(laundryItem.deletedAt);

const laundryItemList = selectLaundryItemSchema.array();

export async function getLaundryItems() {
	const allLaundryItems = await db.select().from(laundryItem).where(isExist);
	return laundryItemList.parse(allLaundryItems);
}

export async function getLaundryItemById(id: string) {
	const laundryItemData = await db
		.select()
		.from(laundryItem)
		.where(and(isExist, eq(laundryItem.id, id)))
		.limit(1);

	ifEmptyThrowError(laundryItemData, "Laundry item data is not found");

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

export async function createLaundryItem(data: CreateLaundryItem) {
	await db.insert(laundryItem).values(data);
}

export async function updateLaundryItemById(id: string, data: UpdateLaundryItemBody) {
	await db
		.update(laundryItem)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(laundryItem.id, id)));
}

export async function deleteLaundryItemById(id: string) {
	await db
		.update(laundryItem)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(laundryItem.id, id)));
}
