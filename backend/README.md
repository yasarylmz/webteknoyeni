# Kampüs Etkinlikleri · Backend (Sprint 8)

Node.js + Express + MongoDB (Mongoose) ile yazılmış REST API. Etkinlikleri JSON olarak verir. Veri MongoDB'de durur: sunucu kapanıp açılınca POST ile eklenen kayıtlar kaybolmaz.

## Çalıştırma

```
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run seed
npm run dev
```

Sunucu `http://localhost:3000` adresinde açılır. Kontrol: `http://localhost:3000/health`.
Başlarken terminalde `MongoDB bağlandı (yerel): 127.0.0.1/kampus` ya da `MongoDB bağlandı (Atlas): ...mongodb.net/kampus` yazar.

| Komut | Ne yapar |
|---|---|
| `npm run dev` | `node --watch src/server.js`: önce veritabanına bağlanır, sonra sunucuyu açar; dosya değişince yeniden başlatır |
| `npm start` | `node src/server.js` |
| `npm run seed` | Veritabanındaki etkinlikleri silip 6 örnek etkinliği yeniden ekler (kaç kez çalışırsa çalışsın 6 kayıt) |

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinlediği port. Yoksa 3000. |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | MongoDB bağlantı adresi; sonundaki `/kampus` veritabanı adı. Atlas için: Atlas > Connect > Drivers adresini kopyala, `<db_password>` yerine şifreni yaz, `.net/` sonrasına `kampus` ekle. Bu adres sadece `.env` dosyasına yazılır. |

Gerçek adres sadece `.env` dosyasına yazılır; `.env` GitHub'a gitmez (`.gitignore`). `.env.example`'daki değer yer tutucudur.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir, tarihe göre sıralı (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 8: MongoDB'den |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | Sprint 8: MongoDB'den |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 | Sprint 8: MongoDB'ye |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

Status kodları: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

- `GET /events/yok` gibi biçimi bozuk id → 404 (500 değil; `mongoose.isValidObjectId` ile kontrol edilir).
- Biçimi doğru ama kaydı olmayan id → 404.
- Kurala uymayan POST (eksik alan, listede olmayan kategori, 3 harften kısa başlık) → 400 ve Mongoose'un doğrulama mesajı.
- Beklenmeyen hata → 500 `Server error`; ayrıntı sadece terminalde yazar, sunucu çalışmaya devam eder.

## Veri modeli (`Event`)

| Alan | Tip | Kural |
|---|---|---|
| `title` | String | zorunlu, `trim`, 3–100 karakter |
| `category` | String | zorunlu, `Seminer` · `Atölye` · `Söyleşi` · `Yarışma` |
| `capacity` | Number | en az 0, varsayılan 0 |
| `date` | String | zorunlu, `YYYY-AA-GG` |
| `time` | String | varsayılan `""` |
| `location` | String | `trim`, varsayılan `""` |
| `description` | String | `trim`, en fazla 500 karakter |

`timestamps: true` sayesinde her kayıtta `createdAt` ve `updatedAt` vardır; `_id`'yi MongoDB verir. Model adı `Event` olduğu için collection adı `events`.

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
| `src/app.js` | Express uygulaması, middleware (`cors`, `express.json`), `/health`, route'ları bağlar, 404 ve hata yakalayıcı |
| `src/server.js` | `.env`'i okur, önce veritabanına bağlanır, sonra portu dinler |
| `src/config/database.js` | `MONGODB_URI` ile Mongoose bağlantısı; adresi değil sadece sunucu ve veritabanı adını yazdırır |
| `src/models/event-model.js` | `Event` schema'sı (kurallar) ve modeli |
| `src/data/seed-events.js` | 6 örnek etkinlik (id alanı yok, `_id`'yi MongoDB verir) |
| `src/seed.js` | `npm run seed`: önce `deleteMany`, sonra `insertMany` |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | `Event.find` / `findById` / `create` ile isteği işler |
| `requests/kampus-api.json` | 6 isteklik Postman koleksiyonu (v2.1). Postman > Import ile açılır. 2. istek listedeki ilk `_id`'yi `eventId` değişkenine kaydeder, 3. istek onu kullanır. |
