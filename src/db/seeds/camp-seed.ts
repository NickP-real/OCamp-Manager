import { camp } from "@db/schema/camp";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { generateEntityId } from "@db/utils/entity-utils";
import type { DB } from "@db/utils/db-instance-utils";

export const CAMP_SEED_SIZE = 5;

export async function seedCamp(db: DB) {
	await Promise.all(
		Array.from({ length: CAMP_SEED_SIZE }, async () => {
			const id = generateEntityId("camp");
			const name = faker.company.name();
			const description = faker.lorem.word();
			const hasLaundry = !!Math.round(Math.random());
			const fromDate = faker.date.anytime();
			const toDate = dayjs(fromDate).add(7, "day").toDate();
			await db.insert(camp).values({ id, name, description, hasLaundry, fromDate, toDate });
		})
	);

	console.log("Seed camp successful.");
}
