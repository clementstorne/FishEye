class Api {
  constructor(url) {
    this.url = url;
  }

  async get() {
    return fetch(this.url)
      .then((res) => {
        return res.json();
      })
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
}
