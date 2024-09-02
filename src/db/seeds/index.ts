import { seedCamp } from "./camp-seed";
import { seedStaff } from "./staff-seed";

async function main() {
	await seedCamp();
	await seedStaff();
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
