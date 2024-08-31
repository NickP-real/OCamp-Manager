import * as staffRepository from "$lib/repositories/staff-repository";
import { insertStaffSchema, selectStaffSchema, type CreateStaff } from "@db/schema/staff";

export async function getAllStaffs() {
	try {
		const data = await staffRepository.getStaffs();

		return selectStaffSchema.array().parse(data);
	} catch (error) {
		console.log(error);
	}
}

export async function getStaffById(id: string) {
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

export async function updateStaffById(id: string, data: CreateStaff) {
	try {
		const body = insertStaffSchema.parse(data);
		await staffRepository.updateStaffById(id, body);
	} catch (error) {
		console.log(error);
	}
}
