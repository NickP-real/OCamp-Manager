import { insertRoomLaundryItemSchema } from "@db/schema/laundry-item";
import { z } from "zod";

export const roomLaundryItemSchema = insertRoomLaundryItemSchema
	.pick({ roomId: true, paymentMethod: true })
	.merge(
		z.object({
			laundryItems: insertRoomLaundryItemSchema.pick({ itemId: true, quantity: true }).array()
		})
	);

export type RoomLaundryItemSchema = typeof roomLaundryItemSchema;
