import { timestamp } from 'drizzle-orm/pg-core';

const softDeleteColumns = {
	deletedAt: timestamp('deleted_at').notNull().default(new Date(1)),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow()
};

export default softDeleteColumns;
