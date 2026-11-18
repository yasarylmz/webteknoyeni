import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string; // liste boşsa gösterilecek mesaj
  wide?: boolean; // geniş ekranda 3 sütun (Etkinlikler sayfası)
}

// Dizi alır, her etkinlik için bir EventCard çizer. Bir bileşen, iki sayfa.
function EventList({ events, onShowDetail, emptyText, wide = false }: EventListProps) {
  if (events.length === 0) return <p className="sonuc">{emptyText}</p>;

  return (
    <section className={wide ? "kartlar uclu" : "kartlar"}>
      {events.map((event) => (
        // key index değil, etkinliğin id'si: filtre değişince sıra değişir
        <EventCard key={event.id} event={event} onShowDetail={onShowDetail} />
      ))}
    </section>
  );
}

export default EventList;
