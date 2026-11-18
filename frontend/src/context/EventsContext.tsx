import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CampusEvent, Category, EventFormData } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

// Başta null: Provider'ın dışında kullanılırsa hatayı yakalayabilmek için
const EventsContext = createContext<EventsContextValue | null>(null);

// Form verisini CampusEvent'e çevirir (kontenjan metinden sayıya)
function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    capacity: Number(data.capacity),
    date: data.date,
    time: data.time,
    location: data.location.trim(),
    description: data.description.trim(),
    image: data.image,
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  // Diziyi değiştirmiyoruz (push/splice yok), her seferinde yenisini kuruyoruz
  function addEvent(data: EventFormData) {
    setEvents([...events, toEvent(`event-${Date.now()}`, data)]);
  }

  function updateEvent(id: string, data: EventFormData) {
    setEvents(events.map((e) => (e.id === id ? toEvent(id, data) : e)));
  }

  function deleteEvent(id: string) {
    setEvents(events.filter((e) => e.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

// Kendi hook'umuz: useContext'i kısaltır
export function useEvents(): EventsContextValue {
  const value = useContext(EventsContext);
  if (value === null) throw new Error("EventsProvider yok");
  return value;
}
