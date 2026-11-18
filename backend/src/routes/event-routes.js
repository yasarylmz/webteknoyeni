import { Router } from "express";
import { getEvents, getEventById, createEvent } from "../controllers/event-controller.js";

// app.js'te "/events" öneki verildi; buradaki "/" aslında /events demek
const router = Router();

router.get("/", getEvents); // GET /events
router.get("/:id", getEventById); // GET /events/event-2
router.post("/", createEvent); // POST /events

export default router;
