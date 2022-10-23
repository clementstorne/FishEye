function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("aria-label", name);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    const paragraph = document.createElement("p");
    const place = document.createElement("span");
    place.classList.add("place");
    place.innerHTML = `${city}, ${country} <br>`;
    const catchphrase = document.createElement("span");
    catchphrase.classList.add("catchphrase");
    catchphrase.innerHTML = `${tagline} <br>`;
    const rate = document.createElement("span");
    rate.classList.add("rate");
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
  return { name, picture, city, country, tagline, price, getUserCardDOM };
}
