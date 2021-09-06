/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Lightbox } from './LightBox/lightbox.js';
import {
  newGetId,
  addImage,
  addVideo,
  infoLikesAndPrice,
} from './functions_page-photographers.js';

export const getPhotographersWorks = async () => {
  const response = await fetch('/JS/data.json');
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

  // on recupere tous les prix du photographe  et on les ajoute dans un tableau
  const totalPrice = [];
  photographersList.forEach((value) => {
    if (value.id === newGetId) {
      totalPrice.push(value.price);
    }
  });
  // ajout du compteur de likes et de prix
  infoLikesAndPrice(totalPrice);

  // on affiche la lightBox au click des médias
  Lightbox.init();
};
