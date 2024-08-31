import { ifEmptyThrowError } from "$lib/utils/db-utils";
import { db } from "@db/index";
import { type CreateCampMajor, campMajor, selectCampMajorSchema } from "@db/schema/camp-major";

import { eq } from "drizzle-orm";

type UpdateCampMajorBody = Partial<CreateCampMajor>;

export async function getCampMajors() {
	return await db.select().from(campMajor);
}

export async function getCampMajorById(id: string) {
	const campMajorData = await db.select().from(campMajor).where(eq(campMajor.id, id)).limit(1);

	ifEmptyThrowError(campMajorData, "Camp major data is not found");

	return selectCampMajorSchema.parse(campMajorData.at(0));
}

export async function getCampMajorsByCampId(campId: string, tx = db) {
	return await tx.select().from(campMajor).where(eq(campMajor.campId, campId));
}

export async function createCampMajor(data: CreateCampMajor[], tx = db) {
	return await tx.insert(campMajor).values(data).returning();
}

export async function createCampMajorByCampId() {}

export async function updateCampMajorById(id: string, data: UpdateCampMajorBody) {
	await db
		.update(campMajor)
		.set({ ...data })
		.where(eq(campMajor.id, id));
}

export async function updateCampMajorByCampId(campId: string, data: CreateCampMajor[], tx = db) {
	return await tx.transaction(async (tx) => {
		await deleteCampMajorByCampId(campId, tx);
		if (data.length > 0) return await createCampMajor(data, tx);
		return [];
	});
}

export async function deleteCampMajorById(id: string) {
	await db.delete(campMajor).where(eq(campMajor.id, id));
}

export async function deleteCampMajorByCampId(campId: string, tx = db) {
	await tx.delete(campMajor).where(eq(campMajor.campId, campId));
}
