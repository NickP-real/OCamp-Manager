import { defineConfig } from 'drizzle-kit';
import 'dotenv-flow/config';

export default defineConfig({
	schema: './src/db/schema',
	out: './src/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL || process.env.POSTGRES_URL
	},
	verbose: true,
	strict: true
});
