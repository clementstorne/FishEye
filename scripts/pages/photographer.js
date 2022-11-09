const photographersApi = new PhotographersApi('data/photographers.json');
const mediasApi = new MediasApi('data/photographers.json');

/**
 * Fonction qui récupère l'id du photographe dans l'URL de la page
 * @return  {Integer}  id du photographe
 */
function getPhotographerId() {
  const stringId = new URL(location.href).searchParams.get('id');
  return parseInt(stringId);
}

/**
 * Fonction qui affiche les données du photographe (carte + tarif journalier)
 * @param   {Object}  photographer  Données du photographe
 */
function displayData(photographer) {
  const photographerModel = photographerFactory(photographer);
  photographerModel.createPhotographerCard();
  photographerModel.getPhotographerPrice();
}

/**
 * Fonction qui récupère les médias d'un photographe à partir de son id
 * @param   {Integer}  photographerId  id du photographe dont on veut afficher les médias
 * @return  {Object[]}                 Tableau d'objets contenant les données des médias
 */
async function getPhotographerMedias(photographerId) {
  const allMedias = await mediasApi.getMedias();
  const photographerMedias = allMedias.filter(
    (media) => media.photographerId === photographerId
  );
  return photographerMedias;
}

/**
 * Fonction qui affiche l'ensemble des médias du photographe
 * @param   {Object[]}  medias  Tableau d'objets contenant les données des médias
 */
function displayMedias(medias) {
  const mediasGrid = document.querySelector('.medias-grid');
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

/**
 * Fonction qui calcule le nombre total de likes du photographe
 * @param   {Object[]}  medias  Tableau d'objets contenant les données des médias
 * @return  {Integer}           Nombre total de likes du photographe
 */
function getTotalOfLikes(medias) {
  const arrayOfLikes = [];
  medias.forEach((media) => {
    arrayOfLikes.push(media.likes);
  });
  return arrayOfLikes.reduce((a, b) => a + b, 0);
}

/**
 * Fonction qui affiche le nombre total de likes du photographe
 * @param   {Object[]}  medias  Tableau d'objets contenant les données des médias
 */
function displayTotalOfLikes(medias) {
  const cta = document.querySelector('.cta');
  const photographerPrice = document.querySelector('.price');
  const sum = getTotalOfLikes(medias);
  const totalOfLikes = document.createElement('p');
  cta.insertBefore(totalOfLikes, photographerPrice);
  totalOfLikes.classList.add('likes-total');
  totalOfLikes.innerText = sum;
}

/**
 * Fonction qui gère l'ajout et la suppression d'un like sur un media
 * @param   {HTMLElement}  target  Bouton de like
 */
function addNewLike(target) {
  if (!target.dataset.alreadyLiked) {
    target.dataset.alreadyLiked = 'true';
    target.innerText++;
    document.querySelector('.likes-total').innerText++;
  } else if (target.dataset.alreadyLiked) {
    delete target.dataset.alreadyLiked;
    target.innerText--;
    document.querySelector('.likes-total').innerText--;
  }
}

/**
 * Fonction de tri des médias
 * @param   {String}  orderBy  Critère de tri ('popularity', 'date' ou 'title')
 */
async function sort(orderBy) {
  const photographerId = getPhotographerId();
  const medias = await getPhotographerMedias(photographerId);
  document.querySelector('.medias-grid').innerHTML = '';
  switch (orderBy) {
    case 'popularity':
      displayMedias(medias.sort(popularitySort));
      break;
    case 'date':
      displayMedias(medias.sort(dateSort));
      break;
    case 'title':
      displayMedias(medias.sort(titleSort));
      break;
    default:
      throw new Error('This sort method does not exists');
  }
}

/**
 * Fonction de tri des médias par nombre de likes
 * @param   {Object}  a  Premier média à comparer
 * @param   {Object}  b  Deuxième média à comparer
 * @return  {Integer}    Booléen numérique d'ordre de tri
 */
function popularitySort(a, b) {
  if (a.likes > b.likes) {
    return -1;
  }
  if (a.likes < b.likes) {
    return 1;
  }
  return 0;
}

/**
 * Fonction de tri des médias par date
 * @param   {Object}  a  Premier média à comparer
 * @param   {Object}  b  Deuxième média à comparer
 * @return  {Integer}    Booléen numérique d'ordre de tri
 */
function dateSort(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

/**
 * Fonction de tri des médias par ordre alphabétique des titres
 * @param   {Object}  a  Premier média à comparer
 * @param   {Object}  b  Deuxième média à comparer
 * @return  {Integer}    Booléen numérique d'ordre de tri
 */
function titleSort(a, b) {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
}

/**
 * Fonction qui charge et affiche les données dans le DOM
 */
async function init() {
  const photographerId = getPhotographerId();
  const photographer = await photographersApi.getOnePhotographerData(
    photographerId
  );
  displayData(photographer);
  const medias = await getPhotographerMedias(photographerId);
  displayMedias(medias);
  displayTotalOfLikes(medias);
  displaySelectButton();
}

init();
