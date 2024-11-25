import { API } from "./api.js";
import { UI } from "./ui.js";

//Ui class örneği
const ui = new UI();
//Api class örneği
const api = new API();

document.addEventListener("DOMContentLoaded", () => {
  //Loader render et
  ui.renderLoader();

  //Api istek at ve kart render et
  api
    .getPopular()
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      alert("İşlem gerçekleştirilemedi");
      console.log("Hata:", err);
    });
});
ui.form.addEventListener("submit", (e) => {
  //form gönderildiğinde yenilemeyi engelle
  e.preventDefault();
  //inputtaki arama parametresine eriş
  const query = e.target[0].value;

  //aratılan kelime yoksa fonksiyonu durdurma
  if (query.trim() === "") {
    return alert("Arama girişi yapılmadı.");
  }
  //loader render
  ui.renderLoader();
  //arama sonrası için bBaşlık güncelle
  ui.updateTitle(query + " için sonuçlar");

  //api aratılan kelimeyle istek at / sonra verileri getir / hata varsa bas
  api
    .searchMusic(query)
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      alert("İşlem gerçekleştirilemedi");
      console.log(err);
    });
});

//Liste alanına tıklandığında olay izleme
ui.list.addEventListener("click", (e) => {
  if (e.target.classList.contains("play")) {
    const card = e.target.closest(".card");
    const key = card.dataset.key;

    /// Tıklanan şarkının key ile verisini bulup, ui'de render edilen şarkı verilerini ulaşma
    const song = ui.songs.find((song) => song.key == key);
    if (song) {
      ui.renderPlayer(song);
    }
  }
});
