https://webteknoyeni.vercel.app

# Kampüs Etkinlikleri · Web Teknolojileri

Mustafa Yaşar Yılmaz · 2211012729

| Sprint | Klasör | Konu |
|---|---|---|
| 1 | `sprint1/` | HTML iskeleti |
| 2 | `sprint2/` | CSS ve responsive tasarım |
| 3 | `sprint3/` | JavaScript ve DOM: veriden üretilen kartlar, arama/filtre, `?id=` ile detay, form doğrulama |
| 4 | `frontend/` | Vite + TypeScript + React: 5 sayfa tek `App.tsx` içinde, sayfa geçişi `useState` ile |
| 5 | `frontend/` | React bileşenleri: `App.tsx` 9 bileşene bölündü, veri props ile iner, olaylar callback ile çıkar |

Canlı adres `frontend/` klasörünün son hâlini (şu an Sprint 5) gösterir. Çalıştırmak için: `cd frontend`, `npm install`, `npm run dev`.

## Sprint 4 · frontend klasöründeki dosyalar

| Dosya | Görevi |
|---|---|
| `package.json` | Projenin adı, `dev`/`build`/`preview` komutları ve kullanılan paketlerin listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini kilitler; herkes aynı sürümü kurar. |
| `node_modules/` | `npm install` ile indirilen paketler; `.gitignore` sayesinde GitHub'a gitmez. |
| `tsconfig*.json` | TypeScript ayarları (uygulama kodu için `tsconfig.app.json`, Vite ayar dosyası için `tsconfig.node.json`). |
| `vite.config.ts` | Vite ayarları; React eklentisini açar. |
| `index.html` | Sitenin tek HTML dosyası; içinde React'in dolduracağı boş `div#root` var. |
| `src/main.tsx` | React'i başlatır ve `App` bileşenini `#root` içine çizer. |
| `src/App.tsx` | Uygulamanın ana bileşeni; 5 sayfanın hepsi burada, hangisinin açık olduğunu state belirler. |
| `src/App.css` | App'in stilleri; Sprint 3'teki `2211012729.css` dosyasının içeriği. |
| `src/index.css` | Tüm sayfaya genel stil dosyası; bu sprintte bilerek boş. |
| `public/` | Olduğu gibi kopyalanan dosyalar: etkinlik afişi `afis.svg` ve sekme simgesi. |
| `src/types/campus-event.ts` | Bir etkinliğin tipi (`CampusEvent`) ve 4 değerli `Category` union tipi. |
| `src/data/events.ts` | 6 etkinliğin tipli verisi (`CampusEvent[]`). |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |

## Sprint 5 · yeni dosyalar

| Dosya | Görevi |
|---|---|
| `src/components/layout/Header.tsx` | Sayfa başlığı; başlığı `title` props'u ile App'ten alır. |
| `src/components/layout/Navigation.tsx` | Menü; açık sayfayı `current` ile alır, tıklamayı `onNavigate` ile App'e bildirir. |
| `src/components/layout/Footer.tsx` | Alt bilgi; props almaz. |
| `src/components/events/EventCard.tsx` | Tek etkinlik kartı; "Detayları gör"e basılınca `onShowDetail(id)` çağırır. |
| `src/components/events/EventList.tsx` | Etkinlik dizisini kartlara çevirir; dizi boşsa `emptyText` mesajını gösterir. |
| `src/components/events/EventFilter.tsx` | Arama kutusu ve kategori seçimi; değerler App'teki state'ten gelir. |
| `src/components/events/EventDetail.tsx` | Seçili etkinliğin afişi, künyesi ve iki butonu (`onBack`, `onEdit`). |
| `src/components/forms/EventForm.tsx` | Ekle/Güncelle formu; gönderilince `onSubmit` ile App'e haber verir. |
| `src/types/page.ts` | Sayfa adlarının tipi (`PageName`). |
| `src/utils/format-date.ts` | "2026-10-12" tarihini "12 Ekim 2026" yapar. |
