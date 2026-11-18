# Kampüs Etkinlikleri · Backend (Sprint 7)

Node.js + Express ile yazılmış REST API. Etkinlikleri JSON olarak verir. Veri şimdilik bellekte (`src/data/events.js`); sunucu yeniden başlayınca POST ile eklenenler kaybolur.

## Çalıştırma

```
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev
```

Sunucu `http://localhost:3000` adresinde açılır. Kontrol: `http://localhost:3000/health`.

| Komut | Ne yapar |
|---|---|
| `npm run dev` | `node --watch src/server.js`: dosya değişince sunucu kendini yeniden başlatır |
| `npm start` | `node src/server.js` |

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinlediği port. `.env` dosyasından okunur; yoksa 3000. |

`.env` GitHub'a gitmez (`.gitignore`). Hangi değişkenlerin gerektiği `.env.example` dosyasında yazar.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status kodları: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## Örnek istekler

`GET /health`

```json
{ "status": "ok", "time": "2026-11-18T09:00:00.000Z", "student": "2211012729" }
```

`POST /events` gövdesi:

```json
{ "title": "Git ve GitHub Tanışma", "category": "Atölye", "date": "2026-12-10", "capacity": 30 }
```

## Dosyalar

| Dosya | İşi |
|---|---|
| `src/app.js` | Express uygulaması, middleware (`cors`, `express.json`), `/health`, route'ları bağlar, 404 |
| `src/server.js` | `.env`'i okur, portu dinler |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | İsteği işler, yanıtı döndürür |
| `src/data/events.js` | Bellek içi 6 etkinlik |
| `requests/kampus-api.json` | 6 isteklik Postman koleksiyonu (v2.1). Postman > Import ile açılır. |
