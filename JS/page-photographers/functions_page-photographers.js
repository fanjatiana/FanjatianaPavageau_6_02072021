// eslint-disable-next-line import/extensions
import { getUrlId } from './const_page-photographers.js';

// eslint-disable-next-line import/no-mutable-exports
export let newGetId = '';
// on extrait l id
const getId = getUrlId.slice(4);
// on modifie type de GetId string--> number
newGetId = Number(getId);

export function addImage(element, lastName) {
  document.getElementById('works-list').innerHTML += `<article>
                      <div class = "gallery">
                          <a href="./Photos/gallery/${lastName}/${element.image}" title="${element.title}">
                              <img class="pictures-list" src = "./Photos/gallery/${lastName}/${element.image}" alt ="${element.description}">
                          </a>
                      </div>
                      <div class="info_media">
                          <h2>${element.title}</h2>
                          <div class ="like">
                              <p class="nb-likes">${element.likes}</p>
                              <button class ="likes_media" type="button" aria-label="button-like">
                                  <i class="fas fa-heart "></i>
                              </button>
                          </div>    
                      </div>
               </article>`;
}

export function addVideo(element, lastName) {
  document.getElementById('works-list').innerHTML += `<article">
          <div class="gallery">
              <a href="./Photos/gallery/${lastName}/${element.video}" title="${element.title}">
                  <video controls width="500">
                  ${element.title}
                      <source src="./Photos/gallery/${lastName}/${element.video}" type="video/mp4">
                      <track kind="subtitles" src="./Photos/gallery/${lastName}/${element.track}" srclang="fr" label="francais">
                  </video>
              </a>
          </div>
          <div class="info_media">
              <h2>${element.title}</h2>
              <div class ="like">
                  <p class="nb-likes">${element.likes}</p>
                  <button class ="likes_media" type="button" aria-label="button-like">
                      <i class="fas fa-heart"></i>
                  </button>
              </div>    
          </div>   
      </article>`;
}
