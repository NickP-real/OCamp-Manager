import { ifEmptyThrowError, isExisted } from '$lib/utils/db-utils';
import { db } from '@db/index';
import { camp, campMajor, selectCampSchema, type CreateCamp } from '@db/schema/camps';
import { and, desc, eq } from 'drizzle-orm';
import { type PgSelect } from 'drizzle-orm/pg-core';

const campList = selectCampSchema.array();

const isExist = isExisted(camp.deletedAt);

export async function getCamps() {
	const allCamps = await db.select().from(camp).where(isExist).orderBy(desc(camp.createdAt));
	return campList.parse(allCamps);
}

// query builder
function makeCampByIdDynamicQuery(id: number) {
	return db
		.select()
		.from(camp)
		.where(and(isExist, eq(camp.id, id)))
		.$dynamic();
}

function withCampMajors<T extends PgSelect>(qb: T) {
	return qb.leftJoin(campMajor, eq(campMajor.campId, camp.id));
}

export async function getCampById(id: number) {
	const campData = await makeCampByIdDynamicQuery(id).limit(1);
	ifEmptyThrowError(campData, 'Camp data not found');

	// return selectCampSchema.parse(campData.at(0));
	return campData[0];
}

export async function getCampWithCampMajorsById(id: number) {
	const campData = await withCampMajors(makeCampByIdDynamicQuery(id));
	ifEmptyThrowError(campData, 'Camp data not found');

	// return selectCampSchema.parse(campData.at(0));
	return campData;
}

export async function createCamp(data: CreateCamp) {
	await db.insert(camp).values(data);
}

export async function updateCampById(id: number, data: CreateCamp, tx = db) {
	return (
		await tx
			.update(camp)
			.set({ ...data, updatedAt: new Date() })
			.where(and(isExist, eq(camp.id, id)))
			.returning()
	)[0];
}

export async function deleteCampById(id: number) {
	await db
		.update(camp)
		.set({ deletedAt: new Date() })
		.where(and(isExist, eq(camp.id, id)));
}
