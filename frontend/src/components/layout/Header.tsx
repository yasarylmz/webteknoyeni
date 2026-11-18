interface HeaderProps {
  title: string;
  text?: string; // alt yazı isteğe bağlı
}

// Başlık dışarıdan (App'ten) gelir; bileşen sadece okur
function Header({ title, text }: HeaderProps) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
