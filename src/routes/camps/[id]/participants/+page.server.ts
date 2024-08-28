import { getAllParticipants } from "@controller/paticipant-controller";

export async function load() {
	const participants = getAllParticipants();
	return { participants };
}
