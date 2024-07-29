import {
	insertParticipantSchema,
	selectParticipantSchema,
	type CreateParticipant
} from '@db/schema/users';
import * as participantRepository from '../repositories/participant-repository';
import type { z } from 'zod';

const createParticipantSchema = insertParticipantSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true
});

const updateParticipantSchema = createParticipantSchema.partial();

type UpdateParticipantBody = z.infer<typeof updateParticipantSchema>;

export async function getAllParticipants() {
	return participantRepository.getParticipants();
}

export async function getParticipantById(id: number) {
	try {
		const participant = await participantRepository.getParticipantById(id);
		return selectParticipantSchema.parse(participant);
	} catch (error) {
		console.log(error);
	}
}

export async function createParticipant(data: CreateParticipant) {
	await participantRepository.createParticipant(data);
}

export async function updateParticipant(id: number, data: UpdateParticipantBody) {
	await participantRepository.updateParticipantById(id, data);
}
