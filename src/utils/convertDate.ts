import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

export function convertIsoToFormattedDate(date: Date): string {
  const timeZone = "America/Sao_Paulo";
  const zonedDate = toZonedTime(date, timeZone);
  return format(zonedDate, "dd/MM/yyyy HH:mm", {
    locale: ptBR,
  });
}
