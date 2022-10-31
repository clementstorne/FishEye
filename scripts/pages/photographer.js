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

function displayData(photographer) {
  const photographerModel = photographerFactory(photographer);
  const photographerCard = photographerModel.createPhotographerCard();
  const photographerPrice = photographerModel.getPhotographerPrice();
}

async function getPhotographerMedias(photographerId) {
  const allMedias = await mediasApi.getMedias();
  const photographerMedias = allMedias.filter(
    (media) => media.photographerId == photographerId
  );
  return photographerMedias;
}
function filterImages(photographerMedias) {
  const photographerImages = photographerMedias.filter((media) => !media.video);
  return photographerImages;
}

function filterVideos(photographerMedias) {
  const photographerVideos = photographerMedias.filter((media) => !media.image);
  return photographerVideos;
}

function displayImages(medias) {
  const mediasGrid = document.querySelector(".medias-grid");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.createImageCard();
    mediasGrid.appendChild(mediaCard);
  });
}

function displayVideos(medias) {
  const mediasGrid = document.querySelector(".medias-grid");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCard = mediaModel.createVideoCard();
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
  const cta = document.querySelector(".cta");
  const photographerPrice = document.querySelector(".price");
  const sum = getTotalOfLikes(medias);
  const totalOfLikes = document.createElement("p");
  cta.insertBefore(totalOfLikes, photographerPrice);
  totalOfLikes.classList.add("likes-total");
  totalOfLikes.innerText = sum;
}

async function init() {
  const data = await getPhotographerData(photographerId);
  const photographer = data[0];
  displayData(photographer);
  const medias = await getPhotographerMedias(photographerId);
  const images = filterImages(medias);
  const videos = filterVideos(medias);
  displayImages(images);
  displayVideos(videos);
  displayTotalOfLikes(medias);
}

init();
