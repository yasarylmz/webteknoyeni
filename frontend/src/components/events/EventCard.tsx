import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

function EventCard({ event }: Props) {
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
        <Link to={`/events/${event.id}`}>Detayları gör →</Link>
      </p>
    </article>
  );
}

export default EventCard;
