/**
 * Fonction qui affiche la modale de contact
 */
async function displayModal() {
  const contactModal = document.getElementById('modal-contact');
  const body = document.querySelector('body');
  const modalTitle = document.getElementById('modal-title');

  contactModal.style.display = 'flex';
  contactModal.setAttribute('aria-hidden', 'false');
  body.setAttribute('aria-hidden', 'true');
  firstname.focus();

  const photographerId = getPhotographerId();
  const data = await photographersApi.getOnePhotographerData(photographerId);
  const photographerName = data.name;
  modalTitle.innerHTML = `Contactez-moi <br> ${photographerName}`;
}

/**
 * Fonction qui ferme la modale de contact
 */
function closeModal() {
  const contactModal = document.getElementById('modal-contact');
  const body = document.querySelector('body');

  contactModal.style.display = 'none';
  contactModal.setAttribute('aria-hidden', 'true');
  body.setAttribute('aria-hidden', 'false');
}

/**
 * Fermeture de la modale de contact au clic sur la croix
 */
document
  .getElementById('modal-close-btn')
  .addEventListener('click', closeModal);

/**
 * Fermeture de la modale de contact au clic sur la croix
 */
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeModal();
  }
});

const firstname = document.getElementById('first-name');
const lastname = document.getElementById('last-name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const invalidFeedback = document.querySelectorAll('.invalid-feedback');

/**
 * Fonction qui vérifie si le format du nom et du prénom est valide
 * (au moins 2 caractères alphabétiques ou trait d'union)
 * @param   {String}  str  Chaîne de caractère à tester
 * @return  {Boolean}      'true' sur la chaîne de caractère remplit les conditions et 'false' sinon
 */
function isNameValid(str) {
  let regex =
    /^[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\/\<\>\=\@\[\]\\\^\_\{\}\|\~]{2,}$/;
  return regex.test(str);
}

/**
 * Fonction qui vérifie si le format de l'email est valide
 * @param   {String}  str  Chaîne de caractère à tester
 * @return  {Boolean}      'true' sur la chaîne de caractère remplit les conditions et 'false' sinon
 */
function isEmailValid(str) {
  let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return regex.test(str);
}

/**
 * Fonction qui gère le feedback en cas de sasie invalide du prénom
 */
function validateFirstname() {
  if (!isNameValid(firstname.value)) {
    firstname.setAttribute('aria-invalid', 'true');
    firstname.classList.add('invalid');
    firstname.focus();
    invalidFeedback[0].style.display = 'block';
  } else {
    firstname.removeAttribute('aria-invalid');
    firstname.classList.remove('invalid');
    invalidFeedback[0].style.display = 'none';
  }
}

/**
 * Fonction qui gère le feedback en cas de sasie invalide du nom
 */
function validateLastname() {
  if (!isNameValid(lastname.value)) {
    lastname.setAttribute('aria-invalid', 'true');
    lastname.classList.add('invalid');
    lastname.focus();
    invalidFeedback[1].style.display = 'block';
  } else {
    lastname.removeAttribute('aria-invalid');
    lastname.classList.remove('invalid');
    invalidFeedback[1].style.display = 'none';
  }
}

/**
 * Fonction qui gère le feedback en cas de sasie invalide de l'email
 */
function validateEmail() {
  if (!isEmailValid(email.value)) {
    email.setAttribute('aria-invalid', 'true');
    email.classList.add('invalid');
    email.focus();
    invalidFeedback[2].style.display = 'block';
  } else {
    email.removeAttribute('aria-invalid');
    email.classList.remove('invalid');
    invalidFeedback[2].style.display = 'none';
  }
}

/**
 * Fonction qui gère le feedback en cas de message vide
 */
function validateMessage() {
  if (message.value.length === 0) {
    message.setAttribute('aria-invalid', 'true');
    message.classList.add('invalid');
    message.focus();
    invalidFeedback[3].style.display = 'block';
  } else {
    message.removeAttribute('aria-invalid');
    message.classList.remove('invalid');
    invalidFeedback[3].style.display = 'none';
  }
}

/**
 * Fonction qui vide les champs du formulaire
 */
function clearFormFields() {
  firstname.value = '';
  lastname.value = '';
  email.value = '';
  message.value = '';
}

/**
 * Fonction qui vérifie les champs du formulaire et ne l'envoie que lorsqu'ils sont tous valides.
 * Transmet les informations du formulaire dans la console.
 * Après envoi, ferme la modale et vide les champs du formulaire.
 */
function validate(event) {
  event.preventDefault();
  validateMessage();
  validateEmail();
  validateLastname();
  validateFirstname();
  if (
    isNameValid(firstname.value) &&
    isNameValid(lastname.value) &&
    isEmailValid(email.value) &&
    message.value.length !== 0
  ) {
    closeModal();
    const newMessage = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      message: message.value,
    };
    console.log(
      `Vous avez reçu un nouveau message de ${newMessage.firstname} ${newMessage.lastname} (${newMessage.email}) : ${newMessage.message}`
    );
    clearFormFields();
  }
}
