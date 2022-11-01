// Display and close contact modal

async function displayModal() {
  const contactModal = document.getElementById("modal-contact");
  const body = document.querySelector("body");
  const modalCloseBtn = document.querySelector(".modal-close-btn");
  const modalTitle = document.getElementById("modal-title");

  contactModal.style.display = "flex";
  contactModal.setAttribute("aria-hidden", "false");
  body.setAttribute("aria-hidden", "true");
  firstname.focus();

  const data = await getPhotographerData(photographerId);
  const photographerName = data[0].name;
  modalTitle.innerHTML = `Contactez-moi <br> ${photographerName}`;

  modalCloseBtn.focus();
}

function closeModal() {
  const contactModal = document.getElementById("modal-contact");
  const body = document.querySelector("body");
  const modalCloseBtn = document.querySelector(".modal-close-btn");
  const modalTitle = document.getElementById("modal-title");

  contactModal.style.display = "none";
  contactModal.setAttribute("aria-hidden", "true");
  body.setAttribute("aria-hidden", "false");
}

window.addEventListener("click", (event) => {
  const contactModal = document.getElementById("modal-contact");
  if (event.target === contactModal) {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
  }
});

// Form validation

const firstname = document.getElementById("first-name");
const lastname = document.getElementById("last-name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const invalidFeedback = document.querySelectorAll(".invalid-feedback");

function isNameValid(str) {
  let regex =
    /^[^0-9\.\,\"\?\!\;\:\#\$\%\&\(\)\*\+\/\<\>\=\@\[\]\\\^\_\{\}\|\~]{2,}$/;
  return regex.test(str);
}

function isEmailValid(str) {
  let regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return regex.test(str);
}

function showErrorMessage(formData, message) {
  formData.dataset.error = message;
  formData.dataset.errorVisible = "true";
}

function validateFirstname() {
  if (!isNameValid(firstname.value)) {
    firstname.setAttribute("aria-invalid", "true");
    firstname.classList.add("invalid");
    firstname.focus();
    invalidFeedback[0].style.display = "block";
  } else {
    firstname.removeAttribute("aria-invalid");
    firstname.classList.remove("invalid");
    invalidFeedback[0].style.display = "none";
  }
}

function validateLastname() {
  if (!isNameValid(lastname.value)) {
    lastname.setAttribute("aria-invalid", "true");
    lastname.classList.add("invalid");
    lastname.focus();
    invalidFeedback[1].style.display = "block";
  } else {
    lastname.removeAttribute("aria-invalid");
    lastname.classList.remove("invalid");
    invalidFeedback[1].style.display = "none";
  }
}

function validateEmail() {
  if (!isEmailValid(email.value)) {
    email.setAttribute("aria-invalid", "true");
    email.classList.add("invalid");
    email.focus();
    invalidFeedback[2].style.display = "block";
  } else {
    email.removeAttribute("aria-invalid");
    email.classList.remove("invalid");
    invalidFeedback[2].style.display = "none";
  }
}

function validateMessage() {
  if (message.value === "") {
    message.setAttribute("aria-invalid", "true");
    message.classList.add("invalid");
    message.focus();
    invalidFeedback[3].style.display = "block";
  } else {
    message.removeAttribute("aria-invalid");
    message.classList.remove("invalid");
    invalidFeedback[3].style.display = "none";
  }
}

function clearFormFields() {
  firstname.value = "";
  lastname.value = "";
  email.value = "";
  message.value = "";
}

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
    message.value !== ""
  ) {
    closeModal();
    clearFormFields();
    const newMessage = {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      message: message.value,
    };
    console.log(
      // `Vous avez reçu un nouveau message de ${newMessage.firstname} ${newMessage.lastname} (${newMessage.email}) : ${newMessage.message}`
      newMessage
    );
  }
}
