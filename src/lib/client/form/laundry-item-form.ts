import { insertLaundryItemSchema } from "@db/schema/laundries";

export const laundryItemSchema = insertLaundryItemSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});

export type LaundryItemSchema = typeof laundryItemSchema;
