// "2026-10-12" -> "12 Ekim 2026"
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
