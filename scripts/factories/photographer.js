function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  /**
   * Fonction qui crée la fiche d'un photographe à afficher sur la page d'accueil
   * @return  {HTMLElement}  Fiche du photographe à afficher sur la page d'accueil
   */
  function createUserCard() {
    const article = document.createElement('article');

    const link = document.createElement('a');
    link.setAttribute('href', `./photographer.html?id=${id}`);
    link.setAttribute('aria-label', name);
    article.appendChild(link);

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', '');
    link.appendChild(img);

    const h2 = document.createElement('h2');
    h2.textContent = name;
    link.appendChild(h2);

    const paragraph = document.createElement('p');
    article.appendChild(paragraph);

    const place = document.createElement('span');
    place.classList.add('place');
    place.innerHTML = `${city}, ${country} <br>`;
    paragraph.appendChild(place);

    const catchphrase = document.createElement('span');
    catchphrase.classList.add('catchphrase');
    catchphrase.innerHTML = `${tagline} <br>`;
    paragraph.appendChild(catchphrase);

    const rate = document.createElement('span');
    rate.classList.add('rate');
    rate.innerText = `${price}€/jour`;
    paragraph.appendChild(rate);

    return article;
  }

  /**
   * Fonction qui crée et affiche la fiche d'un photographe sur sa page
   */
  function createPhotographerCard() {
    const main = document.getElementById('main');

    const photographerHeader = document.createElement('div');
    photographerHeader.classList.add('photographer-header');
    main.appendChild(photographerHeader);

    const photographerProfile = document.createElement('div');
    photographerProfile.classList.add('photographer-name');
    photographerHeader.appendChild(photographerProfile);

    const photographerName = document.createElement('div');
    photographerName.classList.add('photographer-name');
    photographerName.innerText = name;
    photographerProfile.appendChild(photographerName);

    const photographerPlace = document.createElement('p');
    photographerPlace.classList.add('photographer-place');
    photographerPlace.innerHTML = `${city}, ${country}`;
    photographerProfile.appendChild(photographerPlace);

    const photographerCatchphrase = document.createElement('p');
    photographerCatchphrase.classList.add('photographer-catchphrase');
    photographerCatchphrase.innerText = tagline;
    photographerProfile.appendChild(photographerCatchphrase);

    const button = document.createElement('button');
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'modal-contact');
    /**
     * Affiche la modale de contact au clic sur le bouton
     */
    button.addEventListener('click', displayModal);
    button.classList.add('contact_button');
    button.innerHTML = 'Contactez-moi';
    photographerHeader.appendChild(button);

    const img = document.createElement('img');
    img.classList.add('user');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name}`);
    photographerHeader.appendChild(img);
  }

  /**
   * Fonction qui affiche le tarif journalier du photographe dans sa page
   */
  function getPhotographerPrice() {
    const body = document.querySelector('body');

    const cta = document.createElement('div');
    cta.classList.add('cta');
    body.appendChild(cta);

    const photographerPrice = document.createElement('p');
    photographerPrice.classList.add('price');
    photographerPrice.innerText = `${price} € / jour`;
    cta.appendChild(photographerPrice);
  }

  return {
    name,
    picture,
    city,
    country,
    tagline,
    price,
    id,
    createUserCard,
    createPhotographerCard,
    getPhotographerPrice,
  };
}
