import { sql } from "@vercel/postgres";
import { drizzle as prodDrizzle, type VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import pg from "pg";
import { env } from "$env/dynamic/private";
import { drizzle as localDrizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";

export let db: NodePgDatabase | VercelPgDatabase;
export type DB = typeof db;

// local pg
if (env.NODE_ENV === "development") {
	const { Client } = pg;
	const client = new Client({ connectionString: env.DATABASE_URL });
	await client.connect();
	db = localDrizzle(client, { logger: true });
} else {
	// vercel
	db = prodDrizzle(sql, { logger: true });
}
