import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

// Tarihi en yakın 2 etkinlik ve veriden kategori listesi
const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
const categories = [...new Set(events.map((e) => e.category))];

function App() {
  // State App'te kalır; bileşenler props ile alır, callback ile bildirir
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  let title = "Ana Sayfa";
  if (page === "events") title = "Etkinlikler";
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <Header title={page === "home" ? "Kampüs Etkinlikleri" : title} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p>
              <a
                className="tumu"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p id="sonuc" aria-live="polite">
                {filtered.length} etkinlik listeleniyor.
              </p>
            )}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramana uygun etkinlik bulunamadı."
              wide
            />
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu" role="alert">
            <p>Aradığın etkinlik bulunamadı.</p>
            <p>
              <a
                className="tumu"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
            </p>
          </div>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && <EventForm onSubmit={() => window.scrollTo(0, 0)} />}
      </main>

      <Footer />
    </>
  );
}

export default App;
