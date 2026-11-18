import { events, toISO, formatDate } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("header h1");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  // Önce kontrol: bulunamazsa event undefined olur, event.title okumak hata verirdi
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";
  container.innerHTML = `
    <div class="hata-kutusu" role="alert">
      <p>Aradığın etkinlik bulunamadı. Adres eksik ya da hatalı olabilir.</p>
      <p><a class="tumu" href="etkinlikler.html">← Listeye dön</a></p>
    </div>`;
} else {
  document.title = event.title;
  baslik.textContent = event.title;
  container.innerHTML = `
    <figure>
      <div class="afis">afiş görseli</div>
      <figcaption>Şekil 1: ${event.title} afişi</figcaption>
    </figure>
    <div>
      <dl class="kunye">
        <dt>Tarih</dt><dd><time datetime="${toISO(event.date)}T${event.time}">${formatDate(event.date)}, ${event.time}</time></dd>
        <dt>Yer</dt><dd>${event.location}</dd>
        <dt>Kategori</dt><dd>${event.category}</dd>
        <dt>Kontenjan</dt><dd>${event.capacity}</dd>
      </dl>
      <p>${event.description}</p>
      <p><a class="buton" href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a></p>
      <p><a class="tumu" href="etkinlikler.html">← Listeye dön</a></p>
    </div>`;
}
