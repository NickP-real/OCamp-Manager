import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { camp, insertCampSchema, selectCampSchema } from '@db/schema/camps';
import { and, desc } from 'drizzle-orm';
import type { z } from 'zod';

type CreateCampBody = z.infer<typeof insertCampSchema>;
type UpdateCampBody = Partial<CreateCampBody>;

const campList = selectCampSchema.array();

const isExist = isExisted(camp.deletedAt);
const hasSameId = isSameId(camp.id);

export async function getCamps() {
	const allCamps = await db.select().from(camp).where(isExist).orderBy(desc(camp.createdAt));
	return campList.parse(allCamps);
}

export async function getCampById(id: number) {
	const campData = await db
		.select()
		.from(camp)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(campData, 'Camp data not found');

	return selectCampSchema.parse(campData.at(0));
}

export async function createCamp(data: CreateCampBody) {
	await db.insert(camp).values(data);
}

export async function updateCampById(id: number, data: UpdateCampBody) {
	await db
		.update(camp)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteCampById(id: number) {
	await db
		.update(camp)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
