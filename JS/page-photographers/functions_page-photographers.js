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


export const infoLikesAndPrice = (totalPrice) =>{
 
  // on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
  let priceOfPhotographers = 0;
  for (let price = 0; price < totalPrice.length; price += 1) {
    priceOfPhotographers += parseFloat(totalPrice[price]);
  }

  const hearts = document.querySelectorAll('.likes_media');
  let numberOfLikes = []
  hearts.forEach((icon) => {
      const arrayValue = icon.previousElementSibling;
      let totalMediaLike = Number(arrayValue.innerText);
      numberOfLikes.push(totalMediaLike)

  })  
let likesOfPhotographers = 0;
  for (let nbLike = 0; nbLike < numberOfLikes.length; nbLike += 1) {
    likesOfPhotographers += parseFloat(numberOfLikes[nbLike]);
  }

  // ajout du bloc compteur de like
  document.getElementById('works-list').innerHTML += `<div id="like_counter">
        <p id="total-likes">${likesOfPhotographers}<i class="fas fa-heart"></i></p>
        <p>${priceOfPhotographers}€ / jour</p>
        </div>`;

  // fonction incrémentation des likes et du compteur de likes

  const buttonHearts = document.querySelectorAll('.likes_media');
  buttonHearts.forEach((heart) => {
    heart.addEventListener('click', () => {
      const arrayValue = heart.previousElementSibling;
      let likeCount = Number(arrayValue.innerText);
      likeCount += 1;
      arrayValue.innerHTML = '';
      arrayValue.innerHTML = `${likeCount}`;
      document.getElementById(
        'total-likes',
      ).innerHTML = `${likesOfPhotographers += 1}<i class="fas fa-heart"></i>`;
    });
  });
}
