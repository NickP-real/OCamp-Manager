import { defineConfig } from 'drizzle-kit';
import { env } from '$env/static/private';

export default defineConfig({
	schema: './src/db/schema',
	driver: 'pg',
	dbCredentials: {
		connectionString: env.POSTGRES_URL!
	},
	verbose: true,
	strict: true
});
