import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

export function convertIsoToFormattedDate(date: Date): string {
  return format(date, "dd/MM/yyyy HH:mm", {
    locale: ptBR,
  });
}
