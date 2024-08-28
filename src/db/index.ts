import { sql } from "@vercel/postgres";
import { drizzle as prodDrizzle, type VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import pg from "pg";
import { NODE_ENV, DATABASE_URL } from "$env/static/private";
import { drizzle as localDrizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";

export let db: NodePgDatabase | VercelPgDatabase;
export type DB = typeof db;

// local pg
if (NODE_ENV === "development") {
	const { Client } = pg;
	const client = new Client({ connectionString: DATABASE_URL });
	await client.connect();
	db = localDrizzle(client, { logger: true });
} else {
	// vercel
	db = prodDrizzle(sql, { logger: true });
}
