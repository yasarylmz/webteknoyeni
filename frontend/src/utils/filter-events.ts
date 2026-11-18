import type { CampusEvent, Category } from "../types/campus-event";

// Saf fonksiyonlar: girdi alır, yeni sonuç döndürür, DOM'a dokunmaz.

// Başlıkta veya açıklamada metni arar (büyük/küçük harf fark etmez).
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  if (q === "") return list;
  return list.filter(
    (e) =>
      e.title.toLocaleLowerCase("tr-TR").includes(q) ||
      e.description.toLocaleLowerCase("tr-TR").includes(q),
  );
}

// "" seçiliyse hepsi, değilse sadece o kategoridekiler.
export function filterByCategory(list: CampusEvent[], category: Category | ""): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

// Tek etkinlik ya da bulunamazsa undefined.
export function findEventById(list: CampusEvent[], id: string): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}
