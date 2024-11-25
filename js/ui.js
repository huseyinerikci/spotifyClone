export class UI {
  //kurucu metot
  constructor() {
    this.list = document.querySelector(".list");
    this.form = document.querySelector("form");
    this.title = document.querySelector("#title");
    this.player = document.querySelector(".player");
    this.songs = []; // şarkı verilerini tutmak için
  }

  //Ekrana müzik kartı render eden fonksiyon
  renderCards(songs) {
    //list HTML temizle
    this.list.innerHTML = "";
    this.songs = songs; //şarkıları saklama

    songs.forEach((song) => {
      const card = document.createElement("div");
      card.className = "card";

      //Card elemanına datasetteki key üzerinden şarkı verisi aktarma
      card.dataset.key = song.key;

      card.innerHTML = `
        <figure>
          <img src="${song.images.coverarthq}" alt="card-img" />
          <div class="play">
            <i class="bi bi-play-fill"></i>
          </div>
        </figure>
        <div class="card-info">
          <h4>${this.sliceText(song.title)}</h4>
          <h4>${song.subtitle}</h4>
        </div>`;
      this.list.appendChild(card);
    });
    if (songs.length > 0) {
      this.renderPlayer(songs[0]); //varsayılan olarak ilk şarkıyı çal
      this.stopPlayer();
    }
  }

  stopPlayer() {
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  //Loader render eden fonksiyon
  renderLoader() {
    this.list.innerHTML = `
<div class="loading">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
    `;
  }

  updateTitle(text) {
    this.title.textContent = text;
  }

  sliceText(text) {
    if (text.length > 16) {
      return text.slice(0, 16) + "...";
    } else {
      return text;
    }
  }

  renderPlayer(song) {
    console.log(song);
    this.player.innerHTML = `
      <div class="info">
        <img src="${song.images.coverarthq}" alt="player-music-img" />
        <div>
          <h5>${this.sliceText(song.title)}</h5>
          <p>${song.subtitle}</p>
        </div>
      </div>
      <audio autoplay src="${song.hub.actions[1].uri}" controls></audio>
      <div class="icons">
        <i class="bi bi-music-note-list"></i>
        <i class="bi bi-boombox-fill"></i>
        <i class="bi bi-pc-display"></i>
      </div>`;

    const audio = this.player.querySelector("audio");

    audio.addEventListener("play", this.playAnimation);
    audio.addEventListener("pause", this.pauseAnimation);
  }

  playAnimation() {
    const playImg = document.querySelector(".info img");
    playImg.classList.add("animate");
  }
  pauseAnimation() {
    const pauseImg = document.querySelector(".info img");
    pauseImg.classList.remove("animate");
  }
}
