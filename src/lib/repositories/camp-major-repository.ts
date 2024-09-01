import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import {
	type CampMajor,
	type CreateCampMajor,
	campMajor,
	selectCampMajorSchema
} from "@db/schema/camp-major";

import { eq } from "drizzle-orm";

type UpdateCampMajorBody = Partial<CreateCampMajor>;

const isExist = isExisted(campMajor.deletedAt);

export async function getAll() {
	return await db.select().from(campMajor).where(isExist);
}

export async function getCampMajorById(id: CampMajor["id"]) {
	const campMajorData = await db.select().from(campMajor).where(eq(campMajor.id, id));

	ifEmptyThrowError(campMajorData, "Camp major data is not found");

	return selectCampMajorSchema.parse(campMajorData.at(0));
}

export async function getCampMajorsByCampId(campId: CampMajor["id"], tx = db) {
	return await tx.select().from(campMajor).where(eq(campMajor.campId, campId));
}

export async function createCampMajor(data: CreateCampMajor[], tx = db) {
	return await tx.insert(campMajor).values(data).returning();
}

export async function createCampMajorByCampId() {}

export async function updateCampMajorById(id: CampMajor["id"], data: UpdateCampMajorBody) {
	await db
		.update(campMajor)
		.set({ ...data })
		.where(eq(campMajor.id, id));
}

export async function updateCampMajorByCampId(
	campId: CampMajor["id"],
	data: CreateCampMajor[],
	tx = db
) {
	return await tx.transaction(async (tx) => {
		await deleteCampMajorByCampId(campId, tx);
		if (data.length > 0) return await createCampMajor(data, tx);
		return [];
	});
}

export async function deleteCampMajorById(id: CampMajor["id"]) {
	await db.delete(campMajor).where(eq(campMajor.id, id));
}

export async function deleteCampMajorByCampId(campId: CampMajor["id"], tx = db) {
	await tx.delete(campMajor).where(eq(campMajor.campId, campId));
}
