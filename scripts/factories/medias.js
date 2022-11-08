function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const picture = `assets/medias/${image}`;
  const movie = `assets/medias/${video}`;

  function createImageCard() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('thumb-imgfull');
    const img = document.createElement('img');
    img.classList.add('thumb-img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${title}, closeup view`);
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', (event) => {
      event.preventDefault();
      displayLightbox(picture, title, 'image');
    });
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        displayLightbox(picture, title, 'image');
      }
    });
    img.dataset.title = title;
    img.dataset.likes = likes;
    img.dataset.date = date;
    const cardBanner = document.createElement('div');
    cardBanner.classList.add('thumb-banner');
    const imgName = document.createElement('p');
    imgName.classList.add('thumb-title');
    imgName.innerText = title;
    const likesNumber = document.createElement('p');
    likesNumber.setAttribute('role', 'button');
    likesNumber.setAttribute('tabindex', '0');
    likesNumber.addEventListener('click', (event) => {
      event.preventDefault();
      addNewLike(event.target);
    });
    likesNumber.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addNewLike(event.target);
      }
    });
    likesNumber.classList.add('likes-number');
    likesNumber.innerText = likes;

    wrapper.appendChild(img);
    wrapper.appendChild(cardBanner);
    cardBanner.appendChild(imgName);
    cardBanner.appendChild(likesNumber);

    return wrapper;
  }

  function createVideoCard() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('thumb-imgfull');
    const vid = document.createElement('video');
    vid.classList.add('thumb-img');
    vid.setAttribute('src', movie);
    vid.setAttribute('alt', `${title}, closeup view`);
    vid.setAttribute('tabindex', '0');
    vid.addEventListener('click', (event) => {
      event.preventDefault();
      displayLightbox(movie, title, 'video');
    });
    vid.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        displayLightbox(movie, title, 'video');
      }
    });
    vid.dataset.title = title;
    vid.dataset.likes = likes;
    vid.dataset.date = date;
    const cardBanner = document.createElement('div');
    cardBanner.classList.add('thumb-banner');
    const imgName = document.createElement('p');
    imgName.classList.add('thumb-title');
    imgName.innerText = title;
    const likesNumber = document.createElement('p');
    likesNumber.setAttribute('role', 'button');
    likesNumber.setAttribute('tabindex', '0');
    likesNumber.addEventListener('click', (event) => {
      event.preventDefault();
      addNewLike(event.target);
    });
    likesNumber.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addNewLike(event.target);
      }
    });
    likesNumber.classList.add('likes-number');
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
