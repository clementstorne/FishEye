/**
 * API qui regroupe l'ensemble des données
 */
class Api {
  /**
   * Définit une source de données pour le site
   * @param   {[String]}  url  URL de la source de données
   */
  constructor(url) {
    this.url = url;
  }

  /**
   * Fonction qui permet de récupérer les données de l'API
   * @return  {(JSON | Error)}  JSON contenant l'ensemble des données de l'API
   */
  async get() {
    return fetch(this.url)
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
}
