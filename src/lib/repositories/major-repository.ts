import { ifEmptyThrowError, isExisted, isSameId } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { insertMajorSchema, major, selectMajorSchema } from '@db/schema/camps';
import { and, like } from 'drizzle-orm';
import type { z } from 'zod';

type CreateMajorBody = z.infer<typeof insertMajorSchema>;
type UpdateMajorBody = Partial<CreateMajorBody>;

const majorList = selectMajorSchema.array();

const isExist = isExisted(major.deletedAt);
const hasSameId = isSameId(major.id);

export async function getMajors() {
	const allMajors = await db.select().from(major).where(isExist);
	return majorList.parse(allMajors);
}

export async function getMajorById(id: number) {
	const majorData = await db
		.select()
		.from(major)
		.where(and(isExist, hasSameId(id)))
		.limit(1);

	ifEmptyThrowError(majorData, 'Major data not found');

	return selectMajorSchema.parse(majorData.at(0));
}

export async function getMajorByName(name: string) {
	const majorData = await db
		.select()
		.from(major)
		.where(and(isExist, like(major.name, name)))
		.limit(1);
	return majorData.at(0) ? selectMajorSchema.parse(majorData.at(0)) : null;
}

export async function createMajor(data: CreateMajorBody) {
	await db.insert(major).values(data);
}

export async function updateMajorById(id: number, data: UpdateMajorBody) {
	await db
		.update(major)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}

export async function deleteMajorById(id: number) {
	await db
		.update(major)
		.set({ deletedAt: new Date() })
		.where(and(isExist, hasSameId(id)));
}
