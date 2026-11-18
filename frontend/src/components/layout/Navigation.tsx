import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const menu: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" },
];

// Veri aşağı (current), olay yukarı (onNavigate): sayfayı değiştiren yine App
function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav aria-label="Ana menü">
      <ul>
        {menu.map((item) => (
          <li key={item.name}>
            <a
              href="#"
              aria-current={current === item.name ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.name);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
