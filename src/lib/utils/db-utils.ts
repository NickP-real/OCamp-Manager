import { Column, isNull, type ColumnBaseConfig } from "drizzle-orm";

// check the row that it is existed, deletedAt === new Date(1)
export function isExisted(deletedAtColumn: Column<ColumnBaseConfig<"date", string>>) {
	return isNull(deletedAtColumn);
}

export function ifEmptyThrowError<T>(data: T[], errorMessage?: string) {
	if (data.length === 0) throw Error(errorMessage ?? "Entity not found");
}
