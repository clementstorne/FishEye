function mediaFactory(data) {
  const { id, photographerId, title, image, likes, date, price } = data;

  const picture = `assets/medias/${image}`;

  function getMediaCard() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("thumb-imgfull");
    const img = document.createElement("img");
    img.classList.add("thumb-img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${title}, closeup view`);
    img.setAttribute("onclick", "openLightBox()");
    const imgName = document.createElement("p");
    imgName.classList.add("thumb-title");
    imgName.innerText = title;
    const likesDiv = document.createElement("div");
    likesDiv.classList.add("likes");
    const likesNumber = document.createElement("span");
    likesNumber.classList.add("likes-number");
    likesNumber.innerText = likes;
    const heart = document.createElement("svg");
    heart.setAttribute("viewBox", "0 0 24 24");
    heart.innerHTML = `
    <g clip-path="url(#clip0_120_411)">
        <path
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
        fill="#911C1C"
        />
    </g>
    <defs>
        <clipPath id="clip0_120_411">
            <rect width="24" height="24" fill="white" />
        </clipPath>
    </defs>
    `;

    wrapper.appendChild(img);
    wrapper.appendChild(imgName);
    wrapper.appendChild(likesDiv);
    likesDiv.appendChild(likesNumber);
    likesDiv.appendChild(heart);

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
