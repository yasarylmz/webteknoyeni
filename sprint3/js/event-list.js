import { events, toISO, formatDate } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

// Bir etkinlikten kart üretir (Sprint 2'deki kartla aynı yapı)
function createCard(event) {
  return `<article>
    <h3>${event.title}</h3>
    <p>${event.category}</p>
    <p><time datetime="${toISO(event.date)}">${formatDate(event.date)}</time></p>
    <p>${event.location}</p>
    <p><a href="etkinlik-detay.html?id=${event.id}">Detayları gör →</a></p>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

if (list.dataset.limit) {
  // Ana sayfa: tarihi en yakın N etkinlik.
  // GG-AA-YYYY doğrudan karşılaştırılırsa yanlış sıralanır, önce YYYY-AA-GG'ye çeviriyoruz.
  const yaklasan = [...events]
    .sort((a, b) => toISO(a.date).localeCompare(toISO(b.date)))
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);
}

// ---------- Arama + kategori filtresi (sadece etkinlikler.html'de var) ----------
const filtreFormu = document.querySelector("#filtre-formu");

if (filtreFormu) {
  const arama = document.querySelector("#arama");
  const kategoriSecimi = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  // Kategorileri veriden üret, her biri bir kez
  const kategoriler = [...new Set(events.map((e) => e.category))];
  kategoriSecimi.innerHTML += kategoriler
    .map((k) => `<option value="${k}">${k}</option>`)
    .join("");

  function filtrele() {
    const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
    const secilen = kategoriSecimi.value;

    const sonuc = events.filter((e) => {
      const metin = `${e.title} ${e.category} ${e.location} ${e.description}`
        .toLocaleLowerCase("tr-TR");
      const metinUyuyor = metin.includes(aranan);
      const kategoriUyuyor = secilen === "" || e.category === secilen;
      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramana uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }

  arama.addEventListener("input", filtrele);
  kategoriSecimi.addEventListener("change", filtrele);
  filtreFormu.addEventListener("submit", (e) => e.preventDefault()); // Enter sayfayı yenilemesin

  filtrele();
}
