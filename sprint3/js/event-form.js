import { events, toISO } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const guncelleModu = form.dataset.mode === "guncelle";
let etkinlik = null;

// ---------- Güncelleme sayfası: formu id ile doldur ----------
if (guncelleModu) {
  const id = new URLSearchParams(location.search).get("id");
  etkinlik = events.find((e) => e.id === id);

  if (etkinlik) {
    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = toISO(etkinlik.date);   // input type="date" YYYY-AA-GG ister
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity;
    form.elements.aciklama.value = etkinlik.description;
  } else {
    // id yoksa ya da yanlışsa boş form değil uyarı göster
    mesaj.remove();
    form.outerHTML = `
      <div class="hata-kutusu" role="alert">
        <p>Güncellenecek etkinlik bulunamadı. Bu sayfaya bir etkinliğin detayından gelmelisin.</p>
        <p><a class="tumu" href="etkinlikler.html">Etkinliklere git →</a></p>
      </div>`;
  }
}

// ---------- Gönderim ve doğrulama ----------
const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

function hataGoster(errors) {
  for (const ad of alanlar) {
    const alan = form.elements[ad];
    const hataYeri = document.querySelector(`#${ad}-hata`);
    if (errors[ad]) {
      alan.setAttribute("aria-invalid", "true");
      hataYeri.textContent = errors[ad];
    } else {
      alan.removeAttribute("aria-invalid"); // düzeltilen alanın eski hatası temizlenir
      hataYeri.textContent = "";
    }
  }
}

// "2026-10-12" -> "12-10-2026" (data.js ile aynı biçim)
function toGunAyYil(iso) {
  if (!iso) return "";
  const [yil, ay, gun] = iso.split("-");
  return `${gun}-${ay}-${yil}`;
}

if (document.body.contains(form)) {
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // sayfa yenilenmesin, yazılanlar kaybolmasın

    const fd = new FormData(form);
    const kontenjanMetni = fd.get("kontenjan").trim();
    const data = {
      id: guncelleModu ? etkinlik.id : `event-${events.length + 1}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: toGunAyYil(fd.get("tarih")),
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      description: fd.get("aciklama").trim(),
      capacity: kontenjanMetni === "" ? null : Number(kontenjanMetni)
    };

    const errors = {};
    if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Bir kategori seç.";
    if (!data.date) errors.tarih = "Tarih seç.";
    if (!data.time) errors.saat = "Saat seç.";
    if (!data.location) errors.yer = "Etkinliğin yerini yaz.";
    if (kontenjanMetni !== "" &&
        (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)) {
      errors.kontenjan = "Kontenjan 1 ile 1000 arasında bir sayı olmalı.";
    }

    hataGoster(errors);

    if (Object.keys(errors).length > 0) {
      mesaj.className = "hata-kutusu";
      mesaj.innerHTML = "<p>Formda hatalı alanlar var. Kırmızı alanları düzeltip tekrar dene.</p>";
      form.querySelector("[aria-invalid='true']").focus();
      return;
    }

    mesaj.className = "basari-kutusu";
    mesaj.innerHTML = `
      <p>${guncelleModu ? "Etkinlik güncellendi." : "Etkinlik kaydedildi."} Oluşan nesne:</p>
      <pre>${JSON.stringify(data, null, 2)}</pre>`;
    console.log(data);
  });
}
