function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    const link = document.createElement('a');
    link.setAttribute('href', `./photographer.html?id=${id}`);
    link.setAttribute('aria-label', name);
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', '');
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const paragraph = document.createElement('p');
    const place = document.createElement('span');
    place.classList.add('place');
    place.innerHTML = `${city}, ${country} <br>`;
    const catchphrase = document.createElement('span');
    catchphrase.classList.add('catchphrase');
    catchphrase.innerHTML = `${tagline} <br>`;
    const rate = document.createElement('span');
    rate.classList.add('rate');
    rate.innerText = `${price}€/jour`;

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(paragraph);
    paragraph.appendChild(place);
    paragraph.appendChild(catchphrase);
    paragraph.appendChild(rate);

    return article;
  }

  function createPhotographerCard() {
    const main = document.getElementById('main');
    const photographerHeader = document.createElement('div');
    photographerHeader.classList.add('photographer-header');
    const photographerProfile = document.createElement('div');
    photographerProfile.classList.add('photographer-name');
    const photographerName = document.createElement('div');
    photographerName.classList.add('photographer-name');
    photographerName.innerText = name;
    const photographerPlace = document.createElement('p');
    photographerPlace.classList.add('photographer-place');
    photographerPlace.innerHTML = `${city}, ${country}`;
    const photographerCatchphrase = document.createElement('p');
    photographerCatchphrase.classList.add('photographer-catchphrase');
    photographerCatchphrase.innerText = tagline;
    const button = document.createElement('button');
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-controls', 'modal-contact');
    button.setAttribute('onclick', 'displayModal()');
    button.classList.add('contact_button');
    button.innerHTML = 'Contactez-moi';
    const img = document.createElement('img');
    img.classList.add('user');
    img.setAttribute('src', picture);
    img.setAttribute('alt', `${name}`);

    main.appendChild(photographerHeader);
    photographerHeader.appendChild(photographerProfile);
    photographerProfile.appendChild(photographerName);
    photographerProfile.appendChild(photographerPlace);
    photographerProfile.appendChild(photographerCatchphrase);
    photographerHeader.appendChild(button);
    photographerHeader.appendChild(img);
  }

  function getPhotographerPrice() {
    const body = document.querySelector('body');
    const cta = document.createElement('div');
    cta.classList.add('cta');
    const photographerPrice = document.createElement('p');
    photographerPrice.classList.add('price');
    photographerPrice.innerText = `${price} € / jour`;

    body.appendChild(cta);
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
    getUserCardDOM,
    createPhotographerCard,
    getPhotographerPrice,
  };
}
