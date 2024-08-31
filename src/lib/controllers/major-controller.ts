import { insertMajorSchema, selectMajorSchema } from "@db/schema/major";
import * as majorRepostiory from "@repository/major-repository";
import type { z } from "zod";

const createMajorSchema = insertMajorSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});

const updateMajorSchema = createMajorSchema.partial();
type CreateMajorBody = z.infer<typeof createMajorSchema>;
type UpdateMajorBody = z.infer<typeof updateMajorSchema>;

export async function getAllMajors() {
	const data = await majorRepostiory.getAll();
	return selectMajorSchema.array().parse(data);
}

export async function getMajorById(id: string) {
	return majorRepostiory.getMajorById(id);
}

export async function createMajor(data: CreateMajorBody) {
	try {
		const body = createMajorSchema.parse(data);
		await majorRepostiory.createMajor(body);
	} catch (err) {
		console.log("create major failed");
	}
}

export async function updateMajor(id: string, data: UpdateMajorBody) {
	try {
		const body = updateMajorSchema.parse(data);
		await majorRepostiory.updateMajorById(id, body);
	} catch (err) {
		console.log("update major failed");
	}
}
