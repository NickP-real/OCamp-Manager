import { createDBInstance } from "@db/utils/db-instance-utils";
import { seedCamp } from "./camp-seed";
import { seedStaff } from "./staff-seed";

async function main() {
	const db = await createDBInstance(process.env.DATABASE_URL);
	await seedCamp(db);
	await seedStaff(db);
}

await main()
	.then(() => {
		console.log("Seed successful.");
		process.exit(0);
	})
	.catch(() => {
		console.error("Seed failed.");
		process.exit(1);
	});
