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

function displayMedias(medias) {
  const mediasGrid = document.querySelector(".medias-grid");

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    if (mediaModel.image !== undefined) {
      const mediaCard = mediaModel.createImageCard();
      mediasGrid.appendChild(mediaCard);
    } else if (mediaModel.video !== undefined) {
      const mediaCard = mediaModel.createVideoCard();
      mediasGrid.appendChild(mediaCard);
    }
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

function addNewLike(target) {
  if (!target.dataset.alreadyLiked) {
    target.dataset.alreadyLiked = "true";
    target.innerText++;
    document.querySelector(".likes-total").innerText++;
  } else if (target.dataset.alreadyLiked) {
    delete target.dataset.alreadyLiked;
    target.innerText--;
    document.querySelector(".likes-total").innerText--;
  }
}

async function sort(orderBy) {
  const medias = await getPhotographerMedias(photographerId);
  switch (orderBy) {
    case "popularity":
      const mediasSortedByPopularity = medias.sort(popularitySort);
      document.querySelector(".medias-grid").innerHTML = "";
      displayMedias(mediasSortedByPopularity);
      break;
    case "date":
      const mediasSortedByDate = medias.sort(dateSort);
      document.querySelector(".medias-grid").innerHTML = "";
      displayMedias(mediasSortedByDate);
      break;
    case "title":
      const mediasSortedByTitle = medias.sort(titleSort);
      document.querySelector(".medias-grid").innerHTML = "";
      displayMedias(mediasSortedByTitle);
      break;
  }
}

function popularitySort(a, b) {
  if (a.likes > b.likes) {
    return -1;
  }
  if (a.likes < b.likes) {
    return 1;
  }
  return 0;
}

function dateSort(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function titleSort(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

async function init() {
  const data = await getPhotographerData(photographerId);
  const photographer = data[0];
  displayData(photographer);
  const medias = await getPhotographerMedias(photographerId);
  displayMedias(medias);
  displayTotalOfLikes(medias);
}

init();
