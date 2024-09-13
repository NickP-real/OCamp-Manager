import { idSchema } from "$lib/utils/params-utils.js";
import { getCampParticipantsByCampId } from "@controllers/camp-participant-controller.js";
import { json } from "@sveltejs/kit";

export async function GET({ request, url, params: { id } }) {
	try {
		console.log(request.headers);
		// const { searchParams } = url;
		const campId = idSchema.parse(id);
		const participants = await getCampParticipantsByCampId(campId);
		return json(participants);
	} catch (error) {
		return new Response("there is an error occured", { status: 500 });
	}
}
