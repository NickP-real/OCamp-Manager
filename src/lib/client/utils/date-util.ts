import dayjs from "dayjs";

export function formatDate(date: Date) {
	return dayjs(date).format("DD MMMM YYYY");
}

export function formatDateInput(date: Date) {
	return dayjs(date).format("YYYY-MM-DD");
}
