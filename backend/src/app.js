import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

// Middleware: her istek route'a gelmeden önce buradan geçer
app.use(cors()); // frontend (localhost:5173) istek atabilsin
app.use(express.json()); // JSON body -> req.body

// Sunucu ayakta mı?
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2211012729",
  });
});

// /events ile başlayan bütün adresler event-routes.js'e gider
app.use("/events", eventRoutes);

// Hiçbir route eşleşmezse
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

// Hata yakalayıcı: 4 parametre olduğu için Express bunu hata middleware'i sayar.
// Kullanıcıya sadece "Server error" gider; ayrıntı terminalde kalır.
app.use((err, req, res, next) => {
  console.error(err.message);
  // Bozuk JSON gibi istemci hataları 400 kalsın, gerisi 500
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: { message: "Invalid JSON" } });
  }
  res.status(500).json({ error: { message: "Server error" } });
});

export default app;
