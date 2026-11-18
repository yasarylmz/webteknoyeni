import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";

// Router yok: hangi sayfanın açık olduğunu bir state tutar.
type PageName = "home" | "events" | "detail" | "add" | "update";

// Menüde görünen sayfalar (Detay ve Güncelle menüde yok, butonla açılır)
const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// "2026-10-12" -> "12 Ekim 2026"
const formatDate = (iso: string) =>
  new Date(`${iso}T00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

// Tarihi en yakın 2 etkinlik (tarih YYYY-AA-GG olduğu için metin sıralaması doğru çalışır)
const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

// Kategori seçenekleri veriden, her biri bir kez
const categories = [...new Set(events.map((e) => e.category))];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştiren tek fonksiyon
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Filtreli liste state değil: her çizimde yeniden hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Başlık sayfaya göre değişir; detayda etkinliğin adı
  let title = "Ana Sayfa";
  if (page === "events") title = "Etkinlikler";
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";

  // Side-effect: başlık değişince sekme adı da değişsin
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  // Aynı kart hem ana sayfada hem Etkinlikler sayfasında kullanılır
  function renderCard(event: CampusEvent) {
    return (
      <article key={event.id}>
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
              go("detail", event.id);
            }}
          >
            Detayları gör →
          </a>
        </p>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{page === "home" ? "Kampüs Etkinlikleri" : title}</h1>
        <nav aria-label="Ana menü">
          <ul>
            {menu.map((item) => (
              <li key={item.page}>
                <a
                  href="#"
                  aria-current={page === item.page ? "page" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.page);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 etkinlik</h2>
            <section className="kartlar">{upcoming.map(renderCard)}</section>
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
            <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Etkinlik adı veya açıklama"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <p id="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramana uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="kartlar uclu">{filtered.map(renderCard)}</section>
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
          <article className="detay">
            {selected.image && (
              <figure>
                <img src={selected.image} alt={`${selected.title} afişi`} width={640} height={360} />
                <figcaption>Şekil 1: {selected.title} afişi</figcaption>
              </figure>
            )}
            <div>
              <dl className="kunye">
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity}</dd>
              </dl>
              <p>{selected.description}</p>
              <p>
                <a
                  className="buton"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("update", selected.id);
                  }}
                >
                  Bu etkinliği güncelle
                </a>
              </p>
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
          </article>
        )}

        {(page === "add" || page === "update") && (
          // Sadece görünüm: state, kaydetme veya doldurma yok (sonraki sprintlerde gelecek)
          <form className="form" noValidate onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="title">Etkinlik adı</label>
            <input type="text" id="title" name="title" maxLength={80} />

            <label htmlFor="category">Kategori</label>
            <select id="category" name="category" defaultValue="">
              <option value="">Seçiniz</option>
              <option value="Seminer">Seminer</option>
              <option value="Atölye">Atölye</option>
              <option value="Söyleşi">Söyleşi</option>
              <option value="Yarışma">Yarışma</option>
            </select>

            <label htmlFor="date">Tarih</label>
            <input type="date" id="date" name="date" />

            <label htmlFor="time">Saat</label>
            <input type="time" id="time" name="time" />

            <label htmlFor="location">Yer</label>
            <input type="text" id="location" name="location" maxLength={80} />

            <label htmlFor="capacity">Kontenjan (isteğe bağlı)</label>
            <input type="number" id="capacity" name="capacity" min={1} max={1000} inputMode="numeric" />

            <label htmlFor="description">Açıklama</label>
            <textarea id="description" name="description" rows={5} />

            <button type="submit">Kaydet</button>
          </form>
        )}
      </main>

      <footer>
        <p>Kampüs Etkinlikleri · Web Teknolojileri</p>
      </footer>
    </>
  );
}

export default App;
