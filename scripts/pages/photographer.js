const photographersApi = new PhotographersApi("data/photographers.json");
const mediasApi = new MediasApi("data/photographers.json");

function getPhotographerId() {
  return new URL(location.href).searchParams.get("id");
}

const photographerId = getPhotographerId();

async function getPhotographerData(photographerId) {
  const photographerData = await photographersApi.getOnePhotographerData(
    photographerId
  );
  return photographerData;
}

async function displayData(photographer) {
  const photographerModel = photographerFactory(photographer);
  const photographerCard = photographerModel.getPhotographerCard();
  const photographerPrice = photographerModel.getPhotographerPrice();
}

async function getPhotographerMedia(photographerId) {
  const allMedias = await mediasApi.getMedias();
  const photographerMedias = allMedias.filter(
    (media) => media.photographerId == photographerId
  );
  return photographerMedias;
}

async function displayMedia(medias) {
  const mediasGrid = document.querySelector(".medias-grid");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.getMediaCard();
    mediasGrid.appendChild(mediaCard);
  });
}

function getTotalOfLikes(medias) {
  let arrayOfLikes = [];
  medias.forEach((media) => {
    arrayOfLikes.push(media.likes);
  });
  return arrayOfLikes.reduce((a, b) => a + b, 0);
}

function displayTotalOfLikes(medias) {
  const sum = getTotalOfLikes(medias);
  const totalOfLikes = document.querySelector(".likes-total");
  totalOfLikes.innerText = sum;
}

async function init() {
  const data = await getPhotographerData(photographerId);
  const photographer = data[0];
  displayData(photographer);
  const medias = await getPhotographerMedia(photographerId);
  displayMedia(medias);
  displayTotalOfLikes(medias);
}

init();
