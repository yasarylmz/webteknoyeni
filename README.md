https://webteknoyeni.vercel.app

# Kampüs Etkinlikleri · Web Teknolojileri

Mustafa Yaşar Yılmaz · 2211012729

| Sprint | Klasör | Konu |
|---|---|---|
| 1 | `sprint1/` | HTML iskeleti |
| 2 | `sprint2/` | CSS ve responsive tasarım |
| 3 | `sprint3/` | JavaScript ve DOM: veriden üretilen kartlar, arama/filtre, `?id=` ile detay, form doğrulama |
| 4 | `frontend/` | Vite + TypeScript + React: 5 sayfa tek `App.tsx` içinde, sayfa geçişi `useState` ile |

Canlı adres artık Sprint 4'ü (`frontend/`) gösterir. Çalıştırmak için: `cd frontend`, `npm install`, `npm run dev`.

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
