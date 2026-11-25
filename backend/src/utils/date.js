// Tarihler API'de "GG-AA-YYYY" metni, veritabanında gerçek Date (UTC gece yarısı).

// "15-10-2026" -> Date.UTC(2026, 9, 15). Biçim yanlışsa ya da gün yoksa (31-02-2026) geçersiz Date.
export function parseDate(value) {
  if (value instanceof Date) return value;
  if (typeof value !== "string") return new Date(NaN);
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value.trim());
  if (!m) return new Date(NaN);
  const [gun, ay, yil] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(Date.UTC(yil, ay - 1, gun));
  // 31-02-2026 gibi değerlerde JavaScript ayı kaydırır (03-03); bunu yakala
  if (date.getUTCFullYear() !== yil || date.getUTCMonth() !== ay - 1 || date.getUTCDate() !== gun) {
    return new Date(NaN);
  }
  return date;
}

// Date -> "GG-AA-YYYY" (UTC)
export function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return date;
  const gun = String(date.getUTCDate()).padStart(2, "0");
  const ay = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${gun}-${ay}-${date.getUTCFullYear()}`;
}

// Bugünün UTC gece yarısı: "yaklaşan" etkinlikler için alt sınır
export function todayStart() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}
