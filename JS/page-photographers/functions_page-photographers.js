// fonctions génériques pour la page des photographes

// eslint-disable-next-line import/extensions
import { getUrlId } from './const_page-photographers.js';

// on extrait l id de l'url et on modifie type de GetId string--> number
// eslint-disable-next-line import/no-mutable-exports
export let newGetId = '';
const getId = getUrlId.slice(4);
newGetId = Number(getId);

// fonction pour afficher les images dans la gallerie
export const addImage = (element, lastName) => {
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
};

// fonction pour afficher les vidéos dans la gallerie
export const addVideo = (element, lastName) => {
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
};

// fonction pour afficher le compteur de likes et du prix journalier des photographes
export const infoLikesAndPrice = (totalPrice) => {
  // calcule (avec la méthode reduce) du prix journalier des photographes
  let totalPriceOfPhotographers = 0;
  for (let price = 0; price < totalPrice.length; price += 1) {
    const sumPrice = (a, b) => a + b;
    totalPriceOfPhotographers = totalPrice.reduce((sumPrice));
  }

  // calcule (avec la méthode reduce) du nombre totale des likes du photographes
  const hearts = document.querySelectorAll('.likes_media');
  const numberOfLikes = [];
  hearts.forEach((icon) => {
    const arrayValue = icon.previousElementSibling;
    const totalMediaLike = Number(arrayValue.innerText);
    numberOfLikes.push(totalMediaLike);
  });
  let totalLikesOfPhotographers = 0;
  for (let nbLike = 0; nbLike < numberOfLikes.length; nbLike += 1) {
    const sumLikes = (a, b) => a + b;
    totalLikesOfPhotographers = numberOfLikes.reduce((sumLikes));
  }

  // ajout du bloc compteur de like
  document.getElementById('works-list').innerHTML += `<div id="like_counter">
        <p id="total-likes">${totalLikesOfPhotographers}<i class="fas fa-heart"></i></p>
        <p>${totalPriceOfPhotographers}€ / jour</p>
        </div>`;

  // incrémentation des likes et du compteur de likes
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
      ).innerHTML = `${totalLikesOfPhotographers += 1}<i class="fas fa-heart"></i>`;
    });
  });
};
