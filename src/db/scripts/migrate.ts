import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "..";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

const migrationsFolder = "./src/db/migrations";

async function main() {
	try {
		await migrate(db as NodePgDatabase, { migrationsFolder });
		console.log("local migration successful");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

main();
