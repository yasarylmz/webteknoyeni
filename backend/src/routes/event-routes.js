import { Router } from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
} from "../controllers/event-controller.js";

// app.js'te "/events" öneki verildi; buradaki "/" aslında /events demek
const router = Router();

router.get("/", getEvents); // GET /events
router.get("/:id", getEventById); // GET /events/:id
router.post("/", createEvent); // POST /events
router.patch("/:id", updateEvent); // PATCH /events/:id

export default router;
