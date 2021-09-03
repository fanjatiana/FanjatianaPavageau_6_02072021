/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Lightbox } from './LightBox/lightbox.js';
import {
  newGetId,
  addImage,
  addVideo,
} from './functions_page-photographers.js';

export const getPhotographersWorks = async () => {
  const response = await fetch('./JS/data.json');
  const data = await response.json().catch((err) => {
    // Une erreur est survenue
    err();
  });

  const photographersList = data.photographers;
  const photographersMedia = data.media;

  // on récupère le nom du photographe dans le Json
  let lastName = '';

  photographersList.forEach((namePhotograph) => {
    if (namePhotograph.id === newGetId) {
      const { name } = namePhotograph; // on vient chercher dans le tableau la valeur de : name
      const nameCut = name.split(' '); // supression des espaces
      const resultLastName = nameCut[1]; // on récupère la 2eme valeur du tableau : nom de famille
      lastName = resultLastName;
    }
  });

  // on affiche la gallerie des médias liées à l id affiché dans l'url

  // ajout des images et video

  photographersMedia.forEach((element) => {
    if (element.photographerId === newGetId && element.image) {
      addImage(element, lastName);
    } else if (element.photographerId === newGetId && element.video) {
      addVideo(element, lastName);
    }
    return false;
  });

  /* ****partie compteur prix/jour***** */

  // on recupere tous les prix du photographe  et on les ajoute dans un tableau
  const totalPrice = [];
  photographersList.forEach((value) => {
    if (value.id === newGetId) {
      totalPrice.push(value.price);
    }
  });

  // on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
  let priceOfPhotographers = 0;
  for (let price = 0; price < totalPrice.length; price += 1) {
    priceOfPhotographers += parseFloat(totalPrice[price]);
  }

  // on recupere tous les likes du photographe et on les ajoute dans un tableau
  const totalLikes = [];
  photographersMedia.forEach((value) => {
    if (value.photographerId === newGetId) {
      totalLikes.push(value.likes);
    }
  });

  // on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
  let likesOfPhotographers = 0;
  for (let nbLike = 0; nbLike < totalLikes.length; nbLike += 1) {
    likesOfPhotographers += parseFloat(totalLikes[nbLike]);
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

  // on affiche la lightBox au click des médias
  Lightbox.init();
};
