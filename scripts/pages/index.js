const photographersApi = new PhotographersApi('data/photographers.json');

/**
 * Fonction qui affiche les fiches de tous les photographes
 * @param   {Object[]}  photographers  Tableau d'objets contenant les données des photographes
 */
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCard = photographerModel.createUserCard();
    photographersSection.appendChild(userCard);
  });
}

/**
 * Fonction qui charge et affiche les données dans le DOM
 */
async function init() {
  const photographers = await photographersApi.getPhotographersData();
  displayData(photographers);
}

init();
