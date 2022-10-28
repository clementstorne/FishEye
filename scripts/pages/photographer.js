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

const sampleMedia = [
  {
    id: 623534343,
    photographerId: 243,
    title: "Lonesome",
    image: "Travel_Lonesome.jpg",
    likes: 88,
    date: "2019-02-03",
    price: 45,
  },
  {
    id: 625025343,
    photographerId: 243,
    title: "Hillside Color",
    image: "Travel_HillsideColor.jpg",
    likes: 85,
    date: "2019-04-03",
    price: 45,
  },
  {
    id: 2525345343,
    photographerId: 243,
    title: "Wednesday Potrait",
    image: "Portrait_Wednesday.jpg",
    likes: 34,
    date: "2019-04-07",
    price: 45,
  },
  {
    id: 2523434634,
    photographerId: 243,
    title: "Nora Portrait",
    image: "Portrait_Nora.jpg",
    likes: 63,
    date: "2019-04-07",
    price: 45,
  },
  {
    id: 398847109,
    photographerId: 243,
    title: "Raw Black Portrait",
    image: "Portrait_Background.jpg",
    likes: 55,
    date: "2019-06-20",
    price: 45,
  },
];

async function init() {
  const data = await getPhotographerData(photographerId);
  const photographer = data[0];
  displayData(photographer);
  const medias = await getPhotographerMedia(photographerId);
  displayMedia(medias);
}

init();
