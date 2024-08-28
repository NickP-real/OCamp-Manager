import { getParticipantById } from "@controller/paticipant-controller";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params: { participantId } }) => {
	const participant = await getParticipantById(+participantId);

	if (!participant) error(404, { message: "Participant not found" });

	return { participant };
};
