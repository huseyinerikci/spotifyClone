//Api URL
const url = "https://shazam.p.rapidapi.com/search?term=ceza&locale=en-US";

//Api ayarı
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "56c7b249e8msh259273216ff3ad1p1a50f0jsnb63206eb6008",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

//Api Class
export class API {
  async getPopular() {
    // const res = await fetch(url, options);
    // const data = await res.json();
    // const formatted = data.tracks.hits.map((item) => item.track);
    // return formatted;

    //birden fazla farklı datalar render etme (yukardaki kodlar yerine )
    const data1 = await this.searchMusic("ceza");
    const data3 = await this.searchMusic("sagopa");
    const data2 = await this.searchMusic("resulaydemir");

    return [...data1, ...data2, ...data3];
  }

  //aratılan kelimeye göre veri getirme
  async searchMusic(query) {
    //url dinamik hale getir
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US`;
    const res = await fetch(url, options);
    const data = await res.json();

    //verinin içerisinde ulunan katmanlı yapıyı düzenle ve veriye eriş
    const formatted = data.tracks.hits.map((item) => item.track);
    return formatted;
  }
}
