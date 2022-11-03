function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const picture = `assets/medias/${image}`;
  const movie = `assets/medias/${video}`;

  function createImageCard() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("thumb-imgfull");
    const link = document.createElement("a");
    link.setAttribute(
      "onclick",
      `displayLightbox('${picture}','${title}','image')`
    );
    const img = document.createElement("img");
    img.classList.add("thumb-img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${title}, closeup view`);
    const cardBanner = document.createElement("div");
    cardBanner.classList.add("thumb-banner");
    const imgName = document.createElement("p");
    imgName.classList.add("thumb-title");
    imgName.innerText = title;
    const likesNumber = document.createElement("p");
    likesNumber.classList.add("likes-number");
    likesNumber.innerText = likes;

    wrapper.appendChild(link);
    link.appendChild(img);
    wrapper.appendChild(cardBanner);
    cardBanner.appendChild(imgName);
    cardBanner.appendChild(likesNumber);

    return wrapper;
  }

  function createVideoCard() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("thumb-imgfull");
    const vid = document.createElement("video");
    vid.classList.add("thumb-img");
    vid.setAttribute("src", movie);
    vid.setAttribute("alt", `${title}, closeup view`);
    vid.setAttribute(
      "onclick",
      `displayLightbox('${movie}','${title}','video')`
    );
    const cardBanner = document.createElement("div");
    cardBanner.classList.add("thumb-banner");
    const imgName = document.createElement("p");
    imgName.classList.add("thumb-title");
    imgName.innerText = title;
    const likesNumber = document.createElement("p");
    likesNumber.classList.add("likes-number");
    likesNumber.innerText = likes;

    wrapper.appendChild(vid);
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
    video,
    likes,
    date,
    price,
    createImageCard,
    createVideoCard,
  };
}
