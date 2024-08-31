import { insertCampStaffSchema } from "@db/schema/camp-staff";

export const campStaffSchema = insertCampStaffSchema.omit({
	id: true,
	campId: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});

export type CampStaffSchema = typeof campStaffSchema;
