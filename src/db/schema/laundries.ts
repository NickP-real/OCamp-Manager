import { index, integer, pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { room } from './rooms';
import { softDeleteColumns } from '../util-columns';
import { paymentMethodEnum } from './enums';

export const laundryItem = pgTable(
	'laundry_item',
	{
		id: serial('id').primaryKey(),
		name: varchar('name', { length: 256 }).notNull(),
		...softDeleteColumns
	},
	(laundryItem) => ({
		laundryItemIdx1: uniqueIndex('laundry_item_idx_1').on(laundryItem.name),
		laundryItemIdx2: index('laundry_item_idx_2').on(laundryItem.deletedAt),
		laundryItemIdx3: index('laundry_item_idx_3').on(laundryItem.createdAt),
		laundryItemIdx4: index('laundry_item_idx_4').on(laundryItem.updatedAt)
	})
);

export const roomLaundryItem = pgTable(
	'room_laundry_item',
	{
		id: serial('id').primaryKey(),
		roomId: integer('room_id')
			.notNull()
			.references(() => room.id),
		itemId: integer('item_id')
			.notNull()
			.references(() => laundryItem.id),
		quantity: integer('quantity').notNull(),
		paymentMethod: paymentMethodEnum('payment_method').notNull(),
		...softDeleteColumns
	},
	(roomLaundryItem) => ({
		roomLaundryItemIdx1: index('room_laundry_item_idx_1').on(roomLaundryItem.roomId),
		roomLaundryItemIdx2: index('room_laundry_item_idx_2').on(roomLaundryItem.itemId),
		roomLaundryItemIdx3: index('room_laundry_item_idx_3').on(roomLaundryItem.deletedAt),
		roomLaundryItemIdx4: index('room_laundry_item_idx_4').on(roomLaundryItem.createdAt),
		roomLaundryItemIdx5: index('room_laundry_item_idx_5').on(roomLaundryItem.updatedAt)
	})
);
