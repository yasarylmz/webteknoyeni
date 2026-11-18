import mongoose from "mongoose";
import { Event } from "../models/event-model.js";

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
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: { message: "Event not found" } });
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
}

// POST /events (Sprint 7 hâli, bir sonraki adımda modele geçecek)
export async function createEvent(req, res) {
  res.status(501).json({ error: { message: "Not implemented" } });
}
