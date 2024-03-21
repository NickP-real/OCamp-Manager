import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { campMajor, insertCampMajorSchema, selectCampMajorSchema } from '@db/schema/camps';
import { and, eq } from 'drizzle-orm';
import type { z } from 'zod';

type CreateCampMajorBody = z.infer<typeof insertCampMajorSchema>;
type UpdateCampMajorBody = Partial<CreateCampMajorBody>;

const campMajorList = selectCampMajorSchema.array();

const isExist = isExisted(campMajor.deletedAt);
const hasSameId = isSameId(campMajor.id);

export async function getCampMajors() {
	const allCampMajors = await db.select().from(campMajor).where(isExist);
	return campMajorList.parse(allCampMajors);
}

export async function getCampMajorById(id: number) {
	const campMajorData = await db
		.select()
		.from(campMajor)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(campMajorData, 'Camp major data is not found');

	return selectCampMajorSchema.parse(campMajorData.at(0));
}

export async function getCampMajorsByCampId(campId: number) {
	const allCampMajors = await db
		.select()
		.from(campMajor)
		.where(and(isExist, eq(campMajor.campId, campId)));
	return campMajorList.parse(allCampMajors);
}

export async function createCampMajor(data: CreateCampMajorBody) {
	await db.insert(campMajor).values(data);
}

export async function updateCampMajorById(id: number, data: UpdateCampMajorBody) {
	await db
		.update(campMajor)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteCampMajorById(id: number) {
	await db
		.update(campMajor)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
