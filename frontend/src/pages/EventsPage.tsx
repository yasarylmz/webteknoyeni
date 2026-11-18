import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import { filterByCategory, searchEvents } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();
  // Arama sadece bu sayfanın işi: state burada, context'te değil
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2 className="bolum-baslik">Etkinlikler</h2>
      <EventFilter
        searchText={searchText}
        onSearchChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <p id="sonuc" aria-live="polite">
        {filtered.length === 0
          ? "Aramana uygun etkinlik bulunamadı."
          : `${filtered.length} etkinlik listeleniyor.`}
      </p>
      <EventList events={filtered} wide />
    </>
  );
}

export default EventsPage;
