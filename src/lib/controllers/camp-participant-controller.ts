import { db } from "@db/index";
import * as participantRepository from "$lib/repositories/participant-repository";
import * as campParticipantRepository from "$lib/repositories/camp-participant-repository";
import { selectParticipantSchema, type CreateParticipant } from "@db/schema/users";
import type { CreateCampParticipant } from "@db/schema/camps";

export async function getCampParticipantsByCampId(campId: number) {
	try {
		const participants = await participantRepository.getParticipantsByCampId(campId);
		return selectParticipantSchema.array().parse(participants.map((data) => data.participant));
	} catch (error) {
		console.log(error);
	}
}

export async function createCampParticipant(campId: number, participantData: CreateParticipant) {
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
