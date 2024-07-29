import { ifEmptyThrowError } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { campMajor, selectCampMajorSchema, type CreateCampMajor } from '@db/schema/camps';
import { eq } from 'drizzle-orm';

type UpdateCampMajorBody = Partial<CreateCampMajor>;

export async function getCampMajors() {
	return await db.select().from(campMajor);
}

export async function getCampMajorById(id: number) {
	const campMajorData = await db.select().from(campMajor).where(eq(campMajor.id, id)).limit(1);

	ifEmptyThrowError(campMajorData, 'Camp major data is not found');

	return selectCampMajorSchema.parse(campMajorData.at(0));
}

export async function getCampMajorsByCampId(campId: number, tx = db) {
	return await tx.select().from(campMajor).where(eq(campMajor.campId, campId));
}

export async function createCampMajor(data: CreateCampMajor[], tx = db) {
	await tx.insert(campMajor).values(data);
}

export async function createCampMajorByCampId() {}

export async function updateCampMajorById(id: number, data: UpdateCampMajorBody) {
	await db
		.update(campMajor)
		.set({ ...data })
		.where(eq(campMajor.id, id));
}

export async function updateCampMajorByCampId(campId: number, data: CreateCampMajor[], tx = db) {
	await tx.transaction(async (tx) => {
		await deleteCampMajorByCampId(campId, tx);
		if (data.length > 0) await createCampMajor(data, tx);
	});
}

export async function deleteCampMajorById(id: number) {
	await db.delete(campMajor).where(eq(campMajor.id, id));
}

export async function deleteCampMajorByCampId(campId: number, tx = db) {
	await tx.delete(campMajor).where(eq(campMajor.campId, campId));
}
