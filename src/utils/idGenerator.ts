/**
 * Gera um ID único usando caracteres alfanuméricos
 * @returns string ID único gerado
 */
export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15);
}
