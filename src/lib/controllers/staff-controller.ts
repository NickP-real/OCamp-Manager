import * as staffRepository from "$lib/repositories/staff-repository";
import {
	insertStaffSchema,
	selectStaffSchema,
	type CreateStaff,
	type Staff
} from "@db/schema/staff";

export async function getAllStaffs() {
	try {
		const data = await staffRepository.getAll();

		return selectStaffSchema.array().parse(data);
	} catch (error) {
		console.log(error);
	}
}

export async function getStaffById(id: Staff["id"]) {
	try {
		const data = await staffRepository.getStaffById(id);
		return selectStaffSchema.parse(data);
	} catch (error) {
		console.log(error);
	}
}

export async function createStaff(data: CreateStaff) {
	try {
		const body = insertStaffSchema.parse(data);
		await staffRepository.createStaff(body);
	} catch (error) {
		console.log(error);
	}
}

export async function updateStaffById(id: Staff["id"], data: CreateStaff) {
	try {
		const body = insertStaffSchema.parse(data);
		await staffRepository.updateStaffById(id, body);
	} catch (error) {
		console.log(error);
	}
}
