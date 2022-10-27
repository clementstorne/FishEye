class Api {
  constructor(url) {
    this.url = url;
  }

  async get() {
    return fetch(this.url)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
}

class PhotographersApi extends Api {
  constructor(url) {
    super(url);
  }

  async getPhotographersData() {
    const res = await this.get();
    return res.photographers;
  }

  async getOnePhotographerData(photographerId) {
    const res = await this.get();
    const photographers = res.photographers;
    const data = photographers.filter(
      (photographer) => photographer.id == photographerId
    );
    return data;
  }
}
