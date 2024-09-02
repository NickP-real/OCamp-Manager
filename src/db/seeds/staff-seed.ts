import { staff } from "@db/schema/staff";
import { db } from "..";
import { generateEntityId } from "@db/utils/entity-utils";
import { faker } from "@faker-js/faker";

const SEED_SIZE = 20;

export async function seedStaff() {
	await Promise.all(
		Array.from({ length: SEED_SIZE }, async () => {
			const id = generateEntityId("staff");
			const firstName = faker.person.firstName();
			const lastName = faker.person.lastName();
			const nickname = faker.person.middleName();
			const phone = faker.phone.number();
			const birthday = faker.date.birthdate({ min: 18, max: 25 });

			await db.insert(staff).values({ id, firstName, lastName, nickname, phone, birthday });
		})
	);

	console.log("Seed staff successful.");
}
