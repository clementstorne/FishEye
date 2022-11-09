/**
 * API qui regroupe les données relatives aux photographes
 * @extends Api
 */
class PhotographersApi extends Api {
  /**
   * Définit une source de données pour le site
   * @param   {[String]}  url  URL de la source de données
   */
  constructor(url) {
    super(url);
  }

  /**
   * Fonction qui permet de récupérer les données de tous les photographes
   * @return  {Object[]}  Tableau d'objets contenant les données des photographes
   */
  async getPhotographersData() {
    const res = await this.get();
    return res.photographers;
  }

  /**
   * Fonction qui permet de récupérer les données d'un seul photographe à partir de son id
   * @param   {Integer}  photographerId  id du photographe dont on veut récupérer les données
   * @return  {Object}                   Objet qui contient les informations du photographe
   */
  async getOnePhotographerData(photographerId) {
    const res = await this.get();
    const { photographers } = res;
    const data = photographers.filter(
      (photographer) => photographer.id === photographerId
    );
    return data[0];
  }
}
