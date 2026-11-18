// Tüm etkinlikler tek yerde. Sayfalar bu diziden üretilir.
// Tarih biçimi: GG-AA-YYYY, saat: SS:DD
export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 120
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Lab 2",
    description: "Arduino ile basit bir robot kolu yapıyoruz.",
    capacity: 25
  },
  {
    id: "event-3",
    title: "Siber Güvenlik",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "15:30",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla parola güvenliği ve oltalama saldırıları.",
    capacity: 80
  },
  {
    id: "event-4",
    title: "Yapay Zeka ve Etik",
    category: "Seminer",
    date: "05-11-2026",
    time: "13:00",
    location: "A Blok Konferans Salonu",
    description: "Üretken modellerin eğitimde kullanımı ve sorumluluklar.",
    capacity: 150
  },
  {
    id: "event-5",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "18-11-2026",
    time: "11:00",
    location: "Lab 4",
    description: "HTML ve CSS ile ilk kişisel sayfanı birlikte kodluyoruz.",
    capacity: 30
  },
  {
    id: "event-6",
    title: "Girişimcilik Söyleşisi",
    category: "Söyleşi",
    date: "02-12-2026",
    time: "16:00",
    location: "Kütüphane Salonu",
    description: "Öğrenciyken şirket kuran mezunlar deneyimlerini anlatıyor.",
    capacity: 60
  }
];

// "12-10-2026" -> "2026-10-12" (sıralama ve <input type="date"> için)
export function toISO(gunAyYil) {
  const [gun, ay, yil] = gunAyYil.split("-");
  return `${yil}-${ay}-${gun}`;
}

// "12-10-2026" -> "12 Ekim 2026"
export function formatDate(gunAyYil) {
  const [gun, ay, yil] = gunAyYil.split("-").map(Number);
  return new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", {
    day: "numeric", month: "long", year: "numeric"
  });
}
