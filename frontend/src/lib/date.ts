import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export function formatDate(date: string | Date) {
  return dayjs(date).format("DD/MM/YYYY");
}

export function formatDateTime(date: string | Date) {
  return dayjs(date).format("DD/MM/YYYY [às] HH:mm");
}
