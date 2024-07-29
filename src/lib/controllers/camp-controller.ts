import type { CampFormBody } from '$lib/client/form/camp-form';
import {
	insertCampSchema,
	type Camp,
	type CampMajor,
	type CreateCampMajor
} from '@db/schema/camps';
import * as campRepository from '@repository/camp-repository';
import * as campMajorRepository from '@repository/camp-major-repository';
import type { z } from 'zod';
import { db } from '@db/index';

const createCampSchema = insertCampSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});
// const updateCampSchema = createCampSchema.partial();
type CreateCampBody = z.infer<typeof createCampSchema>;
// type UpdateCampBody = z.infer<typeof updateCampSchema>;
export type CampWithMajors = Camp & { campMajor: CampMajor[] };

export async function getAllCamps() {
	return campRepository.getCamps();
}

export async function getCampById(id: number) {
	const data = await campRepository.getCampWithCampMajorsById(id);

	return data.reduce((prev, { camp, camp_major }) => {
		if (!prev.id) prev = { ...camp, campMajor: [] };
		if (camp_major) prev.campMajor.push(camp_major);
		return prev;
	}, {} as CampWithMajors);
}

export async function createCamp(data: CreateCampBody) {
	try {
		const body = createCampSchema.parse(data);
		await campRepository.createCamp(body);
	} catch (err) {
		console.log(err);
		throw new Error('Create camp fail');
	}
}

export async function updateCamp(id: number, data: CampFormBody): Promise<CampFormBody> {
	try {
		const updatedData = await db.transaction(async (tx) => {
			const body = {
				...data,
				laundryPrice: data.laundryPrice ? data.laundryPrice.toString() : null
			};
			const campData = await campRepository.updateCampById(id, body, tx);
			if (data.campMajors) {
				const campMajorData: CreateCampMajor[] = data.campMajors.map((campMajor) => ({
					campId: id,
					majorId: campMajor.majorId
				}));
				await campMajorRepository.updateCampMajorByCampId(id, campMajorData);
			}

			return campData;
		});

		return {
			...updatedData,
			campMajors: data.campMajors,
			laundryPrice: updatedData.laundryPrice ? parseFloat(updatedData.laundryPrice) : undefined
		};
	} catch (err) {
		console.log(err);
		throw new Error('Update camp fail');
	}
}
