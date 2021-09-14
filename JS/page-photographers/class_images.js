/* eslint-disable import/prefer-default-export */
// Class constructions des images

export class Image {
  constructor(media) {
    Object.assign(this, media);
  }

  build(lastName) {
    return `<article>
   <div class="gallery">
       <a href="Photos/gallery/${lastName}/${this.image}" title="${this.title}">
           <img class="pictures-list" src="./Photos/gallery/${lastName}/${this.image}" alt="${this.description}">
       </a>
   </div>
   <div class="info_media">
       <h2>${this.title}</h2>
       <div class ="like">
           <p class="nb-likes">${this.likes}</p>
           <button class ="likes_media" type="button" aria-label="button-like">
               <i class="fas fa-heart "></i>
           </button>
       </div>    
   </div>
</article>`;
  }
}
