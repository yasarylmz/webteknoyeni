import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

// Sprint 4'teki renderCard fonksiyonu artık bir bileşen
function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article>
      <h3>{event.title}</h3>
      <p>{event.category}</p>
      <p>
        <time dateTime={event.date}>{formatDate(event.date)}</time>, {event.time}
      </p>
      <p>{event.location}</p>
      <p>Kontenjan: {event.capacity}</p>
      <p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onShowDetail(event.id);
          }}
        >
          Detayları gör →
        </a>
      </p>
    </article>
  );
}

export default EventCard;
