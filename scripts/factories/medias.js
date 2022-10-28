function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const picture = `assets/medias/${image}`;

  function getMediaCard() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("thumb-imgfull");
    const img = document.createElement("img");
    img.classList.add("thumb-img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${title}, closeup view`);
    img.setAttribute("onclick", "openLightBox()");
    const cardBanner = document.createElement("div");
    cardBanner.classList.add("thumb-banner");
    const imgName = document.createElement("p");
    imgName.classList.add("thumb-title");
    imgName.innerText = title;
    const likesNumber = document.createElement("p");
    likesNumber.classList.add("likes-number");
    likesNumber.innerText = likes;

    wrapper.appendChild(img);
    wrapper.appendChild(cardBanner);
    cardBanner.appendChild(imgName);
    cardBanner.appendChild(likesNumber);

    return wrapper;
  }

  return {
    id,
    photographerId,
    title,
    image,
    likes,
    date,
    price,
    getMediaCard,
  };
}
