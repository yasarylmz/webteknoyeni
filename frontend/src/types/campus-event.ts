// Bir etkinliğin "tarifi": hangi alanlar var, her alan hangi tipte.
// Kategori sadece bu 4 değerden biri olabilir (union type).
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  capacity: number;
  date: string; // YYYY-AA-GG, ör. "2026-10-12"
  time: string; // SS:DD, ör. "14:00"
  location: string;
  description: string;
  image?: string; // afiş isteğe bağlı: yoksa detayda görsel çizilmez
}
