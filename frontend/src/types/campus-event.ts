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
  image?: string; // afiş isteğe bağlı
}

// Formdaki değerler: id yok, input hep metin verir (kontenjan da metin),
// kategori henüz seçilmemişse "".
export interface EventFormData {
  title: string;
  category: Category | "";
  capacity: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image?: string;
}

// Her alana en fazla bir hata mesajı
export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
