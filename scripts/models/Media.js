class Media {
  constructor(data) {
    this.id = data.id;
    this.photographerId = data.photographerId;
    this.title = data.title;
    this.image = data.image;
    this.likes = data.likes;
    this.date = data.date;
    this.price = data.price;
  }

  get photographerId() {
    return this.photographerId;
  }

  get title() {
    return this.title;
  }

  get fileName() {}

  get likes() {
    return this.likes;
  }

  get mediaType() {
    let extension = image.split(".")[1];
  }
}
