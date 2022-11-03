function displayLightbox(mediaSrc, title, mediaType) {
  const lightboxModal = document.getElementById("lightbox-wrapper");
  const body = document.querySelector("body");
  const lightboxMediaWrapper = document.querySelector(
    ".lightbox-media-wrapper"
  );

  lightboxModal.style.display = "block";
  lightboxModal.setAttribute("aria-hidden", "false");
  body.setAttribute("aria-hidden", "true");

  if (mediaType === "image") {
    const lightboxMedia = document.createElement("img");
    lightboxMedia.classList.add("lightbox-media");
    lightboxMedia.setAttribute("src", mediaSrc);
    lightboxMedia.setAttribute("alt", title);
    lightboxMediaWrapper.appendChild(lightboxMedia);

    const lightboxMediaTitle = document.createElement("div");
    lightboxMediaTitle.classList.add("lightbox-media-title");
    lightboxMediaTitle.innerText = title;
    lightboxModal.appendChild(lightboxMediaTitle);
  } else if (mediaType === "video") {
    const lightboxMedia = document.createElement("video");
    lightboxMedia.classList.add("lightbox-media");
    lightboxMedia.setAttribute("src", mediaSrc);
    lightboxMedia.setAttribute("alt", title);
    lightboxMedia.setAttribute("controls", "controls");
    lightboxMediaWrapper.appendChild(lightboxMedia);

    const lightboxMediaTitle = document.createElement("div");
    lightboxMediaTitle.classList.add("lightbox-media-title");
    lightboxMediaTitle.innerText = title;

    lightboxMedia.focus();
  }
}

function closeLightbox() {
  const lightboxModal = document.getElementById("lightbox-wrapper");
  const body = document.querySelector("body");

  lightboxModal.style.display = "none";
  lightboxModal.setAttribute("aria-hidden", "true");
  body.setAttribute("aria-hidden", "false");

  document.querySelector(".lightbox-media").remove();
  document.querySelector(".lightbox-media-title").remove();
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeLightbox();
  }
});
