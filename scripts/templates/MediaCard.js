class MediaCard {
  constructor(media, title, likes) {
    this.media = media;
    this.title = title;

    this.$wrapper = document.createElement("div");
    this.$wrapper.classList.add("thumb-imgfull");
  }

  get media() {
    return this.media;
  }

  createMediaCard() {
    const mediaCard = `
    <div class="thumb-imgfull">
        <img
          class="thumb-img"
          src="/assets/medias/Animals_Majesty.jpg"
          alt=""
          onclick="openLightBox();currentSlide(1)"
        />
        <p class="thumb-title">Title</p>
        <div class="likes">
          <span class="likes-numer">72</span>
          <svg viewBox="0 0 24 24">
            <g clip-path="url(#clip0_120_411)">
              <path
                d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                fill="#911C1C"
              />
            </g>
            <defs>
              <clipPath id="clip0_120_411">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    `;

    this.$wrapper.innerHTML = movieCard;

    return this.$wrapper;
  }
}
