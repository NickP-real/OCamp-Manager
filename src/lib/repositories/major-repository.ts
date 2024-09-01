import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import { type CreateMajor, type Major, major, selectMajorSchema } from "@db/schema/major";

import { and, eq, like } from "drizzle-orm";

type UpdateMajorBody = Partial<CreateMajor>;

const isExist = isExisted(major.deletedAt);

export async function getAll() {
	return await db.select().from(major).where(isExist);
}

export async function getMajorById(id: Major["id"]) {
	const majorData = await db
		.select()
		.from(major)
		.where(and(isExist, eq(major.id, id)))
		.limit(1);

	ifEmptyThrowError(majorData, "Major data not found");

	return selectMajorSchema.parse(majorData.at(0));
}

export async function getMajorByName(name: Major["name"]) {
	const majorData = await db
		.select()
		.from(major)
		.where(and(isExist, like(major.name, name)))
		.limit(1);
	return majorData.at(0) ? selectMajorSchema.parse(majorData.at(0)) : null;
}

export async function createMajor(data: CreateMajor) {
	await db.insert(major).values(data);
}

export async function updateMajorById(id: Major["id"], data: UpdateMajorBody) {
	await db
		.update(major)
		.set({ ...data, updatedAt: new Date() })
		.where(and(isExist, eq(major.id, id)));
}

export async function deleteMajorById(id: Major["id"]) {
	await db
		.update(major)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(major.id, id)));
}
