import mongoose from "mongoose";
import { parseDate, formatDate } from "../utils/date.js";

// Kurallar schema'da: hatalı kayıt veritabanına hiç girmez.
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    category: {
      type: String,
      required: true,
      enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"],
    },
    capacity: { type: Number, min: 0, default: 0 },
    // İstekte "GG-AA-YYYY" gelir, veritabanında Date olarak durur, yanıtta yine "GG-AA-YYYY" döner
    date: { type: Date, required: true, set: parseDate, get: formatDate },
    time: { type: String, default: "" },
    location: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, maxlength: 500, default: "" },
  },
  {
    timestamps: true, // createdAt ve updatedAt kendiliğinden
    toJSON: { getters: true }, // JSON'a çevirirken date getter'ı çalışsın
    id: false, // getters açılınca eklenen "id" kopyası olmasın, sadece _id
  }
);

// Model adı "Event" -> MongoDB'de collection adı "events"
export const Event = mongoose.model("Event", eventSchema);
