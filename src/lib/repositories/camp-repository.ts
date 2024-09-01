import { ifEmptyThrowError, isExisted } from "$lib/utils/db-utils";
import { db } from "@db/index";
import { camp, type CreateCamp, type Camp } from "@db/schema/camp";
import { campMajor } from "@db/schema/camp-major";

import { and, desc, eq } from "drizzle-orm";
import { type PgSelect } from "drizzle-orm/pg-core";

const isExist = isExisted(camp.deletedAt);

export async function getAll(): Promise<Camp[]> {
	const allCamps = await db.select().from(camp).where(isExist).orderBy(desc(camp.createdAt));
	return allCamps;
}

// query builder
function makeCampByIdDynamicQuery(id: string) {
	return db
		.select()
		.from(camp)
		.where(and(isExist, eq(camp.id, id)))
		.$dynamic();
}

function withCampMajors<T extends PgSelect>(qb: T) {
	return qb.leftJoin(campMajor, eq(campMajor.campId, camp.id));
}

export async function getCampById(id: string) {
	const campData = await makeCampByIdDynamicQuery(id);
	ifEmptyThrowError(campData, "Camp data not found");

	return campData.at(0);
}

export async function getCampWithCampMajorsById(id: string) {
	const campData = await withCampMajors(makeCampByIdDynamicQuery(id));
	ifEmptyThrowError(campData, "Camp data not found");

	return campData;
}

export async function createCamp(data: CreateCamp) {
	await db.insert(camp).values(data);
}

export async function updateCampById(id: string, data: CreateCamp, tx = db) {
	return (
		await tx
			.update(camp)
			.set({ ...data, updatedAt: new Date() })
			.where(and(isExist, eq(camp.id, id)))
			.returning()
	)[0];
}

export async function deleteCampById(id: string) {
	await db
		.update(camp)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(camp.id, id)));
}
