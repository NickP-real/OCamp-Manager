import { defineConfig } from 'drizzle-kit';
import "dotenv-flow/config"

export default defineConfig({
	schema: './src/db/schema',
	out: './src/db/migrations',
	driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL! 
  },
	verbose: true,
	strict: true
});
