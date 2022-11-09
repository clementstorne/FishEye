/**
 * Fonction qui ouvre la lightbox
 * @param   {String}                 mediaSrc   Chemin vers le média
 * @param   {String}                 title      Titre du média
 * @param   {String="image, video"}  mediaType  Type de média à afficher
 */
function displayLightbox(mediaSrc, title, mediaType) {
  const lightboxModal = document.getElementById('lightbox-wrapper');
  const body = document.querySelector('body');
  const lightboxMediaWrapper = document.querySelector(
    '.lightbox-media-wrapper'
  );

  lightboxModal.style.display = 'block';
  lightboxModal.setAttribute('aria-hidden', 'false');
  body.setAttribute('aria-hidden', 'true');

  if (mediaType === 'image') {
    const lightboxMedia = document.createElement('img');
    lightboxMedia.classList.add('lightbox-media');
    lightboxMedia.setAttribute('src', mediaSrc);
    lightboxMedia.setAttribute('alt', title);
    lightboxMediaWrapper.appendChild(lightboxMedia);

    const lightboxMediaTitle = document.createElement('div');
    lightboxMediaTitle.classList.add('lightbox-media-title');
    lightboxMediaTitle.innerText = title;
    lightboxModal.appendChild(lightboxMediaTitle);
  } else if (mediaType === 'video') {
    const lightboxMedia = document.createElement('video');
    lightboxMedia.classList.add('lightbox-media');
    lightboxMedia.setAttribute('src', mediaSrc);
    lightboxMedia.setAttribute('alt', title);
    lightboxMedia.setAttribute('controls', 'controls');
    lightboxMediaWrapper.appendChild(lightboxMedia);

    const lightboxMediaTitle = document.createElement('div');
    lightboxMediaTitle.classList.add('lightbox-media-title');
    lightboxMediaTitle.innerText = title;
    lightboxModal.appendChild(lightboxMediaTitle);

    lightboxMedia.focus();
  }
}

/**
 * Fonction qui ferme la lightbox
 */
function closeLightbox() {
  const lightboxModal = document.getElementById('lightbox-wrapper');
  const body = document.querySelector('body');

  lightboxModal.style.display = 'none';
  lightboxModal.setAttribute('aria-hidden', 'true');
  body.setAttribute('aria-hidden', 'false');

  document.querySelector('.lightbox-media').remove();
  document.querySelector('.lightbox-media-title').remove();
}

/**
 * Fonction qui récupère l'index du média actuellement affichée dans la lightbox
 * @return  {Integer}  Index du média actuellement affichée dans la lightbox
 */
function getCurrentMediaIndex() {
  const medias = Array.from(document.querySelectorAll('.thumb-img'));
  const mediasSrc = medias.map((image) => image.getAttribute('src'));
  const currentMedia = document.querySelector('.lightbox-media');

  return mediasSrc.findIndex((img) => img === currentMedia.getAttribute('src'));
}

/**
 * Fonction qui affiche le média précédent
 */
function previous() {
  const mediasList = Array.from(document.querySelectorAll('.thumb-img'));

  let currentMediaIndex = getCurrentMediaIndex();
  if (currentMediaIndex === 0) {
    currentMediaIndex = mediasList.length;
  }

  const nextMedia = mediasList[currentMediaIndex - 1];
  const nextMediaSrc = nextMedia.getAttribute('src');
  const nextMediaTitle = nextMedia
    .getAttribute('alt')
    .split(',')
    .slice(0, 1)[0];
  const nextMediaType = nextMedia.tagName;

  if (nextMediaType === 'IMG') {
    document.querySelector('.lightbox-media').remove();
    document.querySelector('.lightbox-media-title').remove();
    displayLightbox(nextMediaSrc, nextMediaTitle, 'image');
  } else if (nextMediaType === 'VIDEO') {
    document.querySelector('.lightbox-media').remove();
    document.querySelector('.lightbox-media-title').remove();
    displayLightbox(nextMediaSrc, nextMediaTitle, 'video');
  }
}

/**
 * Fonction qui affiche le média suivant
 */
function next() {
  const mediasList = Array.from(document.querySelectorAll('.thumb-img'));

  let currentMediaIndex = getCurrentMediaIndex();
  if (currentMediaIndex === mediasList.length - 1) {
    currentMediaIndex = -1;
  }

  const nextMedia = mediasList[currentMediaIndex + 1];
  const nextMediaSrc = nextMedia.getAttribute('src');
  const nextMediaTitle = nextMedia
    .getAttribute('alt')
    .split(',')
    .slice(0, 1)[0];
  const nextMediaType = nextMedia.tagName;

  if (nextMediaType === 'IMG') {
    document.querySelector('.lightbox-media').remove();
    document.querySelector('.lightbox-media-title').remove();
    displayLightbox(nextMediaSrc, nextMediaTitle, 'image');
  } else if (nextMediaType === 'VIDEO') {
    document.querySelector('.lightbox-media').remove();
    document.querySelector('.lightbox-media-title').remove();
    displayLightbox(nextMediaSrc, nextMediaTitle, 'video');
  }
}

/**
 * Fonction qui détermine si la lightbox est fermée ou non
 * @return  {Boolean}  'true' si la lightbox est fermé et 'false' si elle est ouverte
 */
function isLightboxClosed() {
  const lightboxModal = document.getElementById('lightbox-wrapper');
  return lightboxModal.getAttribute('aria-hidden');
}

/**
 * Fermeture de la lightbox à l'appui sur la touche Echap du clavier
 */
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isLightboxClosed() === 'false') {
    event.preventDefault();
    closeLightbox();
  }
});

/**
 * Affichage du média précédent à l'appui sur la touche Flèche gauche
 */
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && isLightboxClosed() === 'false') {
    event.preventDefault();
    previous();
  }
});

/**
 * Affichage du média suivant à l'appui sur la touche Flèche droite
 */
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' && isLightboxClosed() === 'false') {
    event.preventDefault();
    next();
  }
});
