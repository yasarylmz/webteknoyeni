import type { Category } from "../../types/campus-event";

interface Props {
  searchText: string;
  onSearchChange: (text: string) => void;
  category: Category | "";
  onCategoryChange: (category: Category | "") => void;
  categories: Category[];
}

// Sadece çizer; state EventsPage'de durur
function EventFilter({ searchText, onSearchChange, category, onCategoryChange, categories }: Props) {
  return (
    <form className="filtre" role="search" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="arama">Ara</label>
        <input
          type="search"
          id="arama"
          placeholder="Etkinlik adı veya açıklama"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="kategori-filtre">Kategori</label>
        <select
          id="kategori-filtre"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
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
  );
}

export default EventFilter;
