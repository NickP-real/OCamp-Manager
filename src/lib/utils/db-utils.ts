import { Column, eq, type ColumnBaseConfig } from 'drizzle-orm';

// check the row that it is existed, deletedAt === new Date(1)
export function isExisted(deletedAtColumn: Column<ColumnBaseConfig<'date', string>>) {
	return eq(deletedAtColumn, new Date(1));
}

export function ifEmptyThrowError<T>(data: T[], errorMessage: string) {
	if (data.length === 0) throw Error(errorMessage);
}

// check the row that have same id
export function isSameId(idColumn: Column<ColumnBaseConfig<'number', string>>) {
	return function (id: number) {
		return eq(idColumn, id);
	};
}
