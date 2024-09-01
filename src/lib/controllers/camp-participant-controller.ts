import { db } from "@db/index";
import * as participantRepository from "$lib/repositories/participant-repository";
import * as campParticipantRepository from "$lib/repositories/camp-participant-repository";
import { selectParticipantSchema, type CreateParticipant } from "@db/schema/participant";
import type { CampParticipant, CreateCampParticipant } from "@db/schema/camp-participant";

export async function getCampParticipantsByCampId(campId: CampParticipant["campId"]) {
	try {
		const participants = await participantRepository.getParticipantsByCampId(campId);
		return selectParticipantSchema.array().parse(participants.map((data) => data.participant));
	} catch (error) {
		console.log(error);
	}
}

export async function createCampParticipant(
	campId: CampParticipant["campId"],
	participantData: CreateParticipant
) {
	try {
		await db.transaction(async (tx) => {
			const participant = await participantRepository.createParticipant(participantData, tx);
			const body: CreateCampParticipant = { campId, participantId: participant[0].id };
			await campParticipantRepository.createCampParticipant(body);
		});

		console.log("Create camp participant success");
	} catch (error) {
		console.log(error);
	}
}
