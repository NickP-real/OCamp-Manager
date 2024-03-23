import { insertCampSchema } from '@db/schema/camps';
import {
	getCamps,
	getCampById as getCampByIdRepository,
	createCamp as createCampRepository,
	updateCampById
} from '@repository/camp-repository';
import type { z } from 'zod';

const createCampSchema = insertCampSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});
const updateCampSchema = createCampSchema.partial();
type CreateCampBody = z.infer<typeof createCampSchema>;
type UpdateCampBody = z.infer<typeof updateCampSchema>;

export async function getAllCamps() {
	return await getCamps();
}

export async function getCampById(id: number) {
	return getCampByIdRepository(id);
}

export async function createCamp(data: CreateCampBody) {
	try {
		const body = createCampSchema.parse(data);
		await createCampRepository(body);
	} catch (err) {
		console.log(err);
		throw new Error('Create camp fail');
	}
}

export async function updateCamp(id: number, data: UpdateCampBody) {
	try {
		await updateCampById(id, data);
	} catch (err) {
		console.log(err);
		throw new Error('Update camp fail');
	}
}
