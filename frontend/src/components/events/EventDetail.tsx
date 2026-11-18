import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

// Tabak: önüne konan etkinliği çizer, nereden geldiğini bilmez
function EventDetail({ event }: Props) {
  return (
    <article className="detay">
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} afişi`} width={640} height={360} />
          <figcaption>Şekil 1: {event.title} afişi</figcaption>
        </figure>
      )}
      <div>
        <dl className="kunye">
          <dt>Tarih</dt>
          <dd>
            <time dateTime={`${event.date}T${event.time}`}>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity}</dd>
        </dl>
        <p>{event.description}</p>
        <p>
          <Link className="buton" to={`/admin/${event.id}/edit`}>
            Bu etkinliği güncelle
          </Link>
        </p>
        <p>
          <Link className="tumu" to="/events">
            ← Listeye dön
          </Link>
        </p>
      </div>
    </article>
  );
}

export default EventDetail;
