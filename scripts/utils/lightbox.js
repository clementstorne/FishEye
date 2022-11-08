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
    lightboxModal.appendChild(lightboxMediaTitle);

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

function getCurrentMediaIndex() {
  const medias = Array.from(document.querySelectorAll(".thumb-img"));
  const mediasSrc = medias.map((image) => image.getAttribute("src"));
  const currentMedia = document.querySelector(".lightbox-media");

  return mediasSrc.findIndex((img) => img === currentMedia.getAttribute("src"));
}

function previous() {
  const mediasList = Array.from(document.querySelectorAll(".thumb-img"));

  let currentMediaIndex = getCurrentMediaIndex();
  if (currentMediaIndex === 0) {
    currentMediaIndex = mediasList.length;
  }

  const nextMedia = mediasList[currentMediaIndex - 1];
  const nextMediaSrc = nextMedia.getAttribute("src");
  const nextMediaTitle = nextMedia
    .getAttribute("alt")
    .split(",")
    .slice(0, 1)[0];
  const nextMediaType = nextMedia.tagName;

  if (nextMediaType === "IMG") {
    document.querySelector(".lightbox-media").remove();
    document.querySelector(".lightbox-media-title").remove();
    displayLightbox(nextMediaSrc, nextMediaTitle, "image");
  } else if (nextMediaType === "VIDEO") {
    document.querySelector(".lightbox-media").remove();
    document.querySelector(".lightbox-media-title").remove();
    displayLightbox(nextMediaSrc, nextMediaTitle, "video");
  }
}

function next() {
  const mediasList = Array.from(document.querySelectorAll(".thumb-img"));

  let currentMediaIndex = getCurrentMediaIndex();
  if (currentMediaIndex === mediasList.length - 1) {
    currentMediaIndex = -1;
  }

  const nextMedia = mediasList[currentMediaIndex + 1];
  const nextMediaSrc = nextMedia.getAttribute("src");
  const nextMediaTitle = nextMedia
    .getAttribute("alt")
    .split(",")
    .slice(0, 1)[0];
  const nextMediaType = nextMedia.tagName;

  if (nextMediaType === "IMG") {
    document.querySelector(".lightbox-media").remove();
    document.querySelector(".lightbox-media-title").remove();
    displayLightbox(nextMediaSrc, nextMediaTitle, "image");
  } else if (nextMediaType === "VIDEO") {
    document.querySelector(".lightbox-media").remove();
    document.querySelector(".lightbox-media-title").remove();
    displayLightbox(nextMediaSrc, nextMediaTitle, "video");
  }
}

function isLightboxClosed() {
  const lightboxModal = document.getElementById("lightbox-wrapper");
  return lightboxModal.getAttribute("aria-hidden");
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && isLightboxClosed() == "false") {
    event.preventDefault();
    closeLightbox();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && isLightboxClosed() == "false") {
    event.preventDefault();
    previous();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && isLightboxClosed() == "false") {
    event.preventDefault();
    next();
  }
});
