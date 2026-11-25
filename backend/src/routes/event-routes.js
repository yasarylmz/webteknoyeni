import { Router } from "express";
import {
  getEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event-controller.js";

// app.js'te "/events" öneki verildi; buradaki "/" aslında /events demek
const router = Router();

router.get("/", getEvents); // GET /events
router.get("/upcoming", getUpcomingEvents); // GET /events/upcoming (/:id'den ÖNCE olmalı, yoksa "upcoming" id sanılır)
router.get("/:id", getEventById); // GET /events/:id
router.post("/", createEvent); // POST /events
router.patch("/:id", updateEvent); // PATCH /events/:id
router.delete("/:id", deleteEvent); // DELETE /events/:id

export default router;
