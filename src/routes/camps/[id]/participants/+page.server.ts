import { getAllParticipants } from "@controllers/paticipant-controller";

export async function load() {
	const participants = getAllParticipants();
	return { participants };
}
