// import { sql } from '@vercel/postgres';
// import { drizzle } from 'drizzle-orm/vercel-postgres';
import { env } from '$env/dynamic/private';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

// local pg
const { Client } = pg;
const client = new Client({ connectionString: env.DATABASE_URL });
await client.connect();
export const db = drizzle(client, { logger: true });

// vercel
// export const db = drizzle(sql, { logger: true });
