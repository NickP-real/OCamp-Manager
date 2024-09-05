import { sql } from "@vercel/postgres";
import { drizzle as prodDrizzle, type VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { drizzle as localDrizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";

export const db = await createDBInstance();
export type DB = NodePgDatabase | VercelPgDatabase;

export async function createDBInstance(): Promise<DB> {
	const env = process.env.NODE_ENV ?? process.env.VERCEL_ENV ?? "development";
	if (env === "development") {
		const { env } = await import("$env/dynamic/private").catch(() => process);
		const { Client } = pg;
		const client = new Client({ connectionString: env.DATABASE_URL });
		await client.connect();
		return localDrizzle(client, { logger: true });
	} else {
		// vercel
		return prodDrizzle(sql, { logger: true });
	}
}
