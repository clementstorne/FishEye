/**
 * API qui regroupe les médias des photographes
 * @extends Api
 */
class MediasApi extends Api {
  /**
   * Définit une source de données pour le site
   * @param   {[String]}  url  URL de la source de données
   */
  constructor(url) {
    super(url);
  }

  /**
   * Fonction qui permet de récupérer tous les médias
   * @return  {Object[]}  Tableau d'objets contenant les données des médias
   */
  async getMedias() {
    const res = await this.get();
    return res.media;
  }
}
