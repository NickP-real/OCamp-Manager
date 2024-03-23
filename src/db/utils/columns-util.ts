import { timestamp } from 'drizzle-orm/pg-core';

export const softDeleteColumns = {
	deletedAt: timestamp('deleted_at', { mode: 'date' }).notNull().default(new Date(1)),
	createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow()
};

export type SoftDeleteColumnKey = keyof typeof softDeleteColumns;
