import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

// Bütün "bulunamadı" yanıtları aynı biçimde
function notFound(res) {
  return res.status(404).json({ error: { message: "Event not found" } });
}

// Değiştirilemeyecek alanlar: kimlik ve zaman damgaları
const READONLY_FIELDS = ["_id", "createdAt", "updatedAt", "__v"];

// GET /events  (?category=Atölye isteğe bağlı)
export async function getEvents(req, res, next) {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    next(err); // hata middleware'ine gider, sunucu çökmez
  }
}

// GET /events/:id
export async function getEventById(req, res, next) {
  try {
    // "yok" gibi biçimi bozuk id'de findById CastError fırlatır (500); önce kontrol et
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      return notFound(res);
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// POST /events
export async function createEvent(req, res, next) {
  try {
    // Doğrulamayı schema yapar (required, enum, minlength, tarih biçimi...)
    const event = await Event.create(req.body ?? {});
    res.status(201).json(event);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// PATCH /events/:id  (sadece gönderilen alanlar değişir)
export async function updateEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }

    const body = req.body ?? {};
    if (Object.keys(body).length === 0) {
      return res.status(400).json({ error: { message: "Body is empty" } });
    }

    const forbidden = READONLY_FIELDS.filter((field) => field in body);
    if (forbidden.length > 0) {
      return res
        .status(400)
        .json({ error: { message: `${forbidden.join(", ")} cannot be changed` } });
    }

    // runValidators: schema kuralları (enum, minlength, tarih) güncellemede de çalışsın
    const event = await Event.findByIdAndUpdate(req.params.id, body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!event) {
      return notFound(res);
    }
    res.json(event);
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ error: { message: err.message } });
    }
    next(err);
  }
}

// DELETE /events/:id  (başarılıysa 204 ve boş gövde)
export async function deleteEvent(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return notFound(res);
    }
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return notFound(res);
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
