# Kampüs Etkinlikleri · Backend (Sprint 9)

Node.js + Express + MongoDB (Mongoose) ile yazılmış REST API. Etkinlikleri JSON olarak verir. Veri MongoDB'de durur: sunucu kapanıp açılınca POST ile eklenen kayıtlar kaybolmaz. Sprint 9 ile tam CRUD (PATCH, DELETE), arama, kategori filtresi ve yaklaşan etkinlikler eklendi.

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
| `npm run seed` | Veritabanındaki etkinlikleri silip 6 örnek etkinliği yeniden ekler (kaç kez çalışırsa çalışsın 6 kayıt; 2'si geçmiş tarihli) |

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
| GET | `/events` | Listeyi getir, tarihe göre sıralı | 200 | — | Sprint 8 |
| GET | `/events?search=atölye` | Başlıkta arar (büyük/küçük harf fark etmez) | 200 | — | Sprint 9 |
| GET | `/events?category=Atölye` | Kategoriye göre süzer (tam eşleşme); `search` ile birlikte de olur | 200 | — | Sprint 9 |
| GET | `/events/upcoming` | Bugün ve sonrası, en yakın önce | 200 | — | Sprint 9 |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | Sprint 8 |
| POST | `/events` | Yeni etkinlik (`title`, `category`, `date` zorunlu) | 201 | 400 | Sprint 8 |
| PATCH | `/events/:id` | Sadece gönderilen alanları güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil, gövde boş döner | 204 | 404 | Sprint 9 |

Tarihler her yerde **GG-AA-YYYY** biçimindedir (ör. `20-12-2026`). İstekte bu biçimde gönderilir, yanıtta bu biçimde döner; veritabanında `Date` olarak saklanır (sıralama ve `/upcoming` için). `2026-12-20` gibi başka biçim → 400.

Status kodları: 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası.

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

- `GET /events/yok` gibi biçimi bozuk id → 404 (500 değil; `mongoose.isValidObjectId` ile kontrol edilir).
- Biçimi doğru ama kaydı olmayan id → 404.
- Kurala uymayan POST veya PATCH (eksik alan, listede olmayan kategori, 3 harften kısa başlık, yanlış tarih biçimi) → 400 ve Mongoose'un doğrulama mesajı.
- Boş gövdeli PATCH → 400 `Body is empty`.
- PATCH ile `_id`, `createdAt`, `updatedAt`, `__v` değiştirilemez → 400 `<alan> cannot be changed`.
- `/upcoming` route'u `/:id`'den önce tanımlıdır; yoksa "upcoming" id sanılıp 404 dönerdi.
- Beklenmeyen hata → 500 `Server error`; ayrıntı sadece terminalde yazar, sunucu çalışmaya devam eder.

## Veri modeli (`Event`)

| Alan | Tip | Kural |
|---|---|---|
| `title` | String | zorunlu, `trim`, 3–100 karakter |
| `category` | String | zorunlu, `Seminer` · `Atölye` · `Söyleşi` · `Yarışma` |
| `capacity` | Number | en az 0, varsayılan 0 |
| `date` | Date | zorunlu, `GG-AA-YYYY` olarak alınır ve döner (`utils/date.js`) |
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
{ "title": "Git ve GitHub Tanışma", "category": "Atölye", "date": "10-12-2026", "capacity": 30 }
```

`PATCH /events/:id` gövdesi (sadece değişen alanlar):

```json
{ "capacity": 45, "date": "12-12-2026" }
```

## Dosyalar

| Dosya | İşi |
|---|---|
| `src/app.js` | Express uygulaması, middleware (`cors`, `express.json`), `/health`, route'ları bağlar, 404 ve hata yakalayıcı |
| `src/server.js` | `.env`'i okur, önce veritabanına bağlanır, sonra portu dinler |
| `src/config/database.js` | `MONGODB_URI` ile Mongoose bağlantısı; adresi değil sadece sunucu ve veritabanı adını yazdırır |
| `src/models/event-model.js` | `Event` schema'sı (kurallar) ve modeli; `date` için setter/getter |
| `src/utils/date.js` | `parseDate` (GG-AA-YYYY → Date), `formatDate` (Date → GG-AA-YYYY), `todayStart` |
| `src/data/seed-events.js` | 6 örnek etkinlik (id alanı yok, `_id`'yi MongoDB verir; 2'si geçmiş tarihli) |
| `src/seed.js` | `npm run seed`: önce `deleteMany`, sonra `insertMany` |
| `src/routes/event-routes.js` | Hangi adres hangi fonksiyona gider |
| `src/controllers/event-controller.js` | `find` / `findById` / `create` / `findByIdAndUpdate` / `findByIdAndDelete` ile isteği işler |
| `requests/kampus-api.json` | 14 isteklik Postman koleksiyonu (v2.1). Postman > Import ile açılır, sırayla çalıştırılır. 2. istek ilk `_id`'yi `eventId`'ye, 5. istek yeni kaydın `_id`'sini `newId`'ye kaydeder; PATCH ve DELETE `newId`'yi kullanır. |
| `requests/run-results.json` | Hocanın test koleksiyonunun Newman çıktısı (18 istek, 45 test, 0 hata) |
