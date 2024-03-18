import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { db } from '.';
import 'dotenv-flow/config';

async function main() {
	try {
		await migrate(db, { migrationsFolder: './src/db/migrations' });
		console.log('Migration successful');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

main();
