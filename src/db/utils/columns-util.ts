import { sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const entityTimestampColumns = {
	deletedAt: timestamp("deleted_at", { mode: "date" }).default(sql`NULL`),
	createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date" })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date())
};

export type SoftDeleteColumnKey = keyof typeof entityTimestampColumns;
