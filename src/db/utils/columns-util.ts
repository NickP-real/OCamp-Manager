import { timestamp } from 'drizzle-orm/pg-core';

export const softDeleteColumns = {
	deletedAt: timestamp('deleted_at').notNull().default(new Date(1)),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
};

export type SoftDeleteColumnKey = keyof typeof softDeleteColumns;
