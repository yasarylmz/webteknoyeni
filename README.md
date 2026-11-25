https://mustafayasaryilmaz-frontend.vercel.app

(Aynı site: https://webteknoyeni.vercel.app)

# Kampüs Etkinlikleri · Web Teknolojileri

Mustafa Yaşar Yılmaz · 2211012729

| Sprint | Klasör | Konu |
|---|---|---|
| 1 | `sprint1/` | HTML iskeleti |
| 2 | `sprint2/` | CSS ve responsive tasarım |
| 3 | `sprint3/` | JavaScript ve DOM: veriden üretilen kartlar, arama/filtre, `?id=` ile detay, form doğrulama |
| 4 | `frontend/` | Vite + TypeScript + React: 5 sayfa tek `App.tsx` içinde, sayfa geçişi `useState` ile |
| 5 | `frontend/` | React bileşenleri: `App.tsx` 9 bileşene bölündü, veri props ile iner, olaylar callback ile çıkar |
| 6 + Vize | `frontend/` | React Router (10 adres), EventsContext, yönetim paneli (ekle/güncelle/sil), giriş, kayıt, şifremi unuttum |
| 7 | `backend/` | Express ile REST API: `/health`, `GET /events`, `GET /events/:id`, `POST /events` (ayrıntı `backend/README.md`) |
| 8 | `backend/` | MongoDB + Mongoose: etkinlikler veritabanında kalıcı, `Event` modeli, `npm run seed` |
| 9 | `backend/` | Tam CRUD: `PATCH` ve `DELETE /events/:id`, `?search` ve `?category`, `GET /events/upcoming`, tarihler GG-AA-YYYY |

Canlı adres `frontend/` klasörünün son hâlini gösterir. `backend/` bu sprintte canlıya alınmaz, bilgisayarda `localhost:3000`'de çalışır.

## Kurulum

Frontend:

```
cd frontend
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` açılır.

Backend (Sprint 9):

```
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

`.env` içindeki `MONGODB_URI` kendi veritabanını göstermeli (yerel MongoDB ya da Atlas). API `http://localhost:3000` adresinde açılır.

## Route listesi

| Adres | Sayfa | Ne yapar |
|---|---|---|
| `/` | HomePage | Yaklaşan 2 etkinlik |
| `/events` | EventsPage | Tüm etkinlikler, arama ve kategori filtresi |
| `/events/:id` | EventDetailPage | Tek etkinliğin detayı (ör. `/events/event-2`) |
| `/login` | LoginPage | Giriş formu (doğrulama, demo) |
| `/register` | RegisterPage | Kayıt formu (doğrulama, demo) |
| `/forgot-password` | ForgotPasswordPage | Şifremi unuttum (demo) |
| `/admin` | AdminPage | Etkinlik tablosu: Düzenle, Sil, Yeni etkinlik |
| `/admin/new` | AddEventPage | Yeni etkinlik formu |
| `/admin/:id/edit` | EditEventPage | Etkinlik güncelleme formu |
| `*` | NotFoundPage | "Sayfa bulunamadı" |

Veri tarayıcının hafızasında tutulur; sayfa yenilenince 6 örnek etkinliğe döner (backend sonraki sprintlerde).

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
| `src/utils/format-date.ts` | "2026-10-12" tarihini "12 Ekim 2026" yapar. |

Sprint 6'da `src/types/page.ts` silindi (sayfayı artık adres belirliyor) ve Header ile Navigation'ın props'ları kaldırıldı.

## Sprint 6 · yeni dosyalar

| Dosya | Görevi |
|---|---|
| `src/context/EventsContext.tsx` | Etkinlik listesi ve `addEvent`, `updateEvent`, `deleteEvent`; `useEvents()` ile her sayfa okur. |
| `src/pages/*.tsx` | 10 sayfa bileşeni; her biri bir adrese bağlı. |
| `src/utils/validate-event.ts` | Etkinlik formunun kuralları; hata nesnesi döndüren saf fonksiyon. |
| `vercel.json` | Vercel'de `/events/event-2` gibi adresler yenilenince de `index.html` açılsın diye yönlendirme. |
