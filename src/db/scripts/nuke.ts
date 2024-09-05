import { camp } from "@db/schema/camp";
import { staff } from "@db/schema/staff";
import { major } from "@db/schema/major";
import { participant } from "@db/schema/participant";
import { campMajor } from "@db/schema/camp-major";
import { campParticipant } from "@db/schema/camp-participant";
import { campStaff } from "@db/schema/camp-staff";
import { staffAccount } from "@db/schema/staff-account";
import { room } from "@db/schema/room";
import { roomStaff } from "@db/schema/room-staff";
import { roomParticipant } from "@db/schema/room-participant";
import { roomLaundryItem } from "@db/schema/room-laundry-item";
import { laundryItem } from "@db/schema/laundry-item";
import { createDBInstance } from "@db/utils/db-instance-utils";

async function main() {
	const db = await createDBInstance(process.env.DATABASE_URL);
	await db.delete(campMajor);
	await db.delete(campParticipant);
	await db.delete(campStaff);
	await db.delete(roomStaff);
	await db.delete(roomParticipant);
	await db.delete(roomLaundryItem);
	await db.delete(room);
	await db.delete(participant);

	await db.delete(camp);
	await db.delete(staffAccount);
	await db.delete(staff);
	await db.delete(major);
	await db.delete(laundryItem);
}

await main()
	.then(() => {
		console.log("Nuke successful.");
		process.exit(0);
	})
	.catch(() => {
		console.log("Nuke fail.");
		process.exit(1);
	});
