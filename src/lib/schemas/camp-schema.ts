import { insertCampSchema } from "@db/schema/camp";

export const createCampSchema = insertCampSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});

export const updateCampSchema = insertCampSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});
