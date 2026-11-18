interface EventFormProps {
  onSubmit: () => void;
}

// Form ne yapılacağını bilmez: gönderilince yukarı haber verir.
// Kaydetme Sprint 6'da gelecek; o zaman bu dosya değişmeyecek.
function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form
      className="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
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
  );
}

export default EventForm;
