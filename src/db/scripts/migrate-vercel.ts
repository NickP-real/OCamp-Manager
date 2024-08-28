import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "..";
import { type VercelPgDatabase } from "drizzle-orm/vercel-postgres";

const migrationsFolder = "./src/db/migrations";

async function main() {
	try {
		await migrate(db as VercelPgDatabase, { migrationsFolder });
		console.log("vercel migration successful");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

main();
