import { init } from "@paralleldrive/cuid2";
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

export type EntityTimestampColumnKey = keyof typeof entityTimestampColumns;

export const generateEntityId = (entityName: string): string => {
	const createId = init({
		random: Math.random,
		length: 24,
		fingerprint: entityName
	});
	return createId();
};
