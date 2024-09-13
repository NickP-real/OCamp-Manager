import { getAllStaffs } from "@controllers/staff-controller";
import { json } from "@sveltejs/kit";

export async function GET() {
	try {
		const staffs = await getAllStaffs();
		return json(staffs);
	} catch (error) {
		return new Response("there is an error occured", { status: 500 });
	}
}
