import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface Props {
  events: CampusEvent[];
  wide?: boolean; // geniş ekranda 3 sütun
}

function EventList({ events, wide = false }: Props) {
  return (
    <section className={wide ? "kartlar uclu" : "kartlar"}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}

export default EventList;
