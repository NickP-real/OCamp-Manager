import { sql } from "@vercel/postgres";
import { drizzle as prodDrizzle, type VercelPgDatabase } from "drizzle-orm/vercel-postgres";
import { drizzle as localDrizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import pg from "pg";

export type DB = NodePgDatabase | VercelPgDatabase;
export async function createDBInstance(databaseURL?: string): Promise<DB> {
	const env = process.env.NODE_ENV ?? process.env.VERCEL_ENV ?? "development";
	if (env === "development") {
		const { Client } = pg;
		const client = new Client({ connectionString: databaseURL });
		await client.connect();
		return localDrizzle(client, { logger: true });
	} else {
		// vercel
		return prodDrizzle(sql, { logger: true });
	}
}
