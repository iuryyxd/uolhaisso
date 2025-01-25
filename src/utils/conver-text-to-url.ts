export function convertToUrlFormat(title: string): string {
  return title
    .toLowerCase() // Converte para minúsculas
    .normalize("NFD") // Normaliza caracteres com acentos
    .replace(/\p{Diacritic}/gu, "") // Remove diacríticos (acentos)
    .replace(/[^a-z0-9 ]/g, "") // Remove caracteres especiais, mantendo apenas letras, números e espaços
    .trim() // Remove espaços no início e no fim
    .replace(/\s+/g, "-"); // Substitui espaços por hifens
}
