const photographersApi = new PhotographersApi("data/photographers.json");

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

// const data = getPhotographerData(photographerId);

async function displayData(photographer) {
  // const photographerHeader = document.getElementById("main");
  const photographerModel = photographerFactory(photographer);
  const photographerCard = photographerModel.getPhotographerCard();
  // photographerHeader.appendChild(photographerCard);
}

async function init() {
  const data = await getPhotographerData(photographerId);
  const photographer = data[0];
  displayData(photographer);
}

init();
