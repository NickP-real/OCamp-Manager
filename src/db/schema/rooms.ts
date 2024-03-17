import {
	index,
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	uniqueIndex,
	varchar
} from 'drizzle-orm/pg-core';
import { camp } from './camps';
import { softDeleteColumns } from '../util-columns';
import { student } from './users';

// TODO: add staff room, or perhaps TA room
export const room = pgTable(
	'room',
	{
		id: serial('id').primaryKey(),
		name: varchar('name', { length: 256 }).notNull(),
		description: text('description'),
		campId: integer('camp_id').references(() => camp.id),
		...softDeleteColumns
	},
	(room) => ({
		composite: primaryKey({ columns: [room.campId, room.name] }),
		roomIdx1: uniqueIndex('room_idx_1').on(room.name),
		roomIdx2: index('room_idx_2').on(room.campId),
		roomIdx3: index('room_idx_3').on(room.deletedAt),
		roomIdx4: index('room_idx_4').on(room.updatedAt),
		roomIdx5: index('room_idx_5').on(room.createdAt)
	})
);

export const roomStudent = pgTable(
	'room_student',
	{
		id: serial('id').primaryKey(),
		roomId: integer('room_id').references(() => room.id),
		studentId: integer('student_id').references(() => student.id),
		...softDeleteColumns
	},
	(roomStudent) => ({
		composite: primaryKey({ columns: [roomStudent.studentId, roomStudent.roomId] }),
		roomStudentIdx1: uniqueIndex('room_student_idx_1').on(roomStudent.roomId),
		roomStudentIdx2: uniqueIndex('room_student_idx_2').on(roomStudent.studentId),
		roomStudentIdx3: index('room_student_idx_3').on(roomStudent.deletedAt),
		roomStudentIdx4: index('room_student_idx_4').on(roomStudent.createdAt),
		roomStudentIdx5: index('room_student_idx_5').on(roomStudent.updatedAt)
	})
);
