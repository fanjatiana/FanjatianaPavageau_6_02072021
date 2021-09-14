/* eslint-disable import/prefer-default-export */
// class construction des vidéos

export class Video {
  constructor(media) {
    Object.assign(this, media);
  }

  build(lastName) {
    return `<article>
      <div class="gallery">
          <a href="Photos/gallery/${lastName}/${this.video}" title="${this.title}">
              <video>
              ${this.title}
                  <source src="./Photos/gallery/${lastName}/${this.video}" type="video/mp4">
                  <track kind="subtitles" src="./Photos/gallery/${lastName}/${this.track}" srclang="fr" label="francais">
              </video>
          </a>
      </div>
      <div class="info_media">
          <h2>${this.title}</h2>
          <div class="like">
              <p class="nb-likes">${this.likes}</p>
              <button class="likes_media" type="button" aria-label="button-like">
                  <i class="fas fa-heart"></i>
              </button>
          </div>    
      </div>   
  </article>`;
  }
}
