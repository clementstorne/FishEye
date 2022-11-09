function mediaFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  const picture = `assets/medias/${image}`;
  const movie = `assets/medias/${video}`;

  /**
   * Fonction qui crée et affiche la carte d'une image sur la page photographe
   *
   * @return  {HTMLElement}  Carte d'une image à afficher sur la page photographe
   */
  function createImageCard() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('thumb-imgfull');

    const img = document.createElement('img');
    img.classList.add('thumb-img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${title}, closeup view`);
    img.setAttribute('tabindex', '0');
    /**
     * Ouvre la lightbox au clic sur l'image
     */
    img.addEventListener('click', (event) => {
      event.preventDefault();
      displayLightbox(picture, title, 'image');
    });
    /**
     * Ouvre la lightbox au clavier
     */
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        displayLightbox(picture, title, 'image');
      }
    });
    wrapper.appendChild(img);

    const cardBanner = document.createElement('div');
    cardBanner.classList.add('thumb-banner');
    wrapper.appendChild(cardBanner);

    const imgName = document.createElement('p');
    imgName.classList.add('thumb-title');
    imgName.innerText = title;
    cardBanner.appendChild(imgName);

    const likesNumber = document.createElement('p');
    likesNumber.setAttribute('role', 'button');
    likesNumber.setAttribute('tabindex', '0');
    /**
     * Ajoute/Supprime un like au clic
     */
    likesNumber.addEventListener('click', (event) => {
      event.preventDefault();
      addNewLike(event.target);
    });
    /**
     * Ajoute/Supprime un like au clavier
     */
    likesNumber.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addNewLike(event.target);
      }
    });
    likesNumber.classList.add('likes-number');
    likesNumber.innerText = likes;
    cardBanner.appendChild(likesNumber);

    return wrapper;
  }

  /**
   * Fonction qui crée et affiche la carte d'une vidéo sur la page photographe
   *
   * @return  {HTMLElement}  Carte d'une vidéo à afficher sur la page photographe
   */
  function createVideoCard() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('thumb-imgfull');

    const vid = document.createElement('video');
    vid.classList.add('thumb-img');
    vid.setAttribute('src', movie);
    vid.setAttribute('alt', `${title}, closeup view`);
    vid.setAttribute('tabindex', '0');
    /**
     * Ouvre la lightbox au clic sur la vidéo
     */
    vid.addEventListener('click', (event) => {
      event.preventDefault();
      displayLightbox(movie, title, 'video');
    });
    /**
     * Ouvre la lightbox au clavier
     */
    vid.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        displayLightbox(movie, title, 'video');
      }
    });
    vid.dataset.title = title;
    vid.dataset.likes = likes;
    vid.dataset.date = date;
    wrapper.appendChild(vid);

    const cardBanner = document.createElement('div');
    cardBanner.classList.add('thumb-banner');
    wrapper.appendChild(cardBanner);

    const imgName = document.createElement('p');
    imgName.classList.add('thumb-title');
    imgName.innerText = title;
    cardBanner.appendChild(imgName);

    const likesNumber = document.createElement('p');
    likesNumber.setAttribute('role', 'button');
    likesNumber.setAttribute('tabindex', '0');
    /**
     * Ajoute/Supprime un like au clic
     */
    likesNumber.addEventListener('click', (event) => {
      event.preventDefault();
      addNewLike(event.target);
    });
    /**
     * Ajoute/Supprime un like au clavier
     */
    likesNumber.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        addNewLike(event.target);
      }
    });
    likesNumber.classList.add('likes-number');
    likesNumber.innerText = likes;
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
