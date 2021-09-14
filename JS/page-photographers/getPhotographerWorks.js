/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Lightbox } from './LightBox/lightbox.js';
import { newGetId, infoLikesAndPrice } from './functions_page-photographers.js';
import { MediasFactory } from './factory_medias.js';

export const getPhotographersWorks = async () => {
  const response = await fetch('./JS/data.json');
  const data = await response.json().catch((error) => {
    // Une erreur est survenue
    console.log(error);
  });

  const photographersList = data.photographers;
  const photographersMedia = data.media;

  // on récupère le nom du photographe dans le Json
  let lastName = '';

  photographersList.forEach((namePhotograph) => {
    if (namePhotograph.id === newGetId) {
      const { name } = namePhotograph; // on vient chercher dans le tableau la valeur de : name
      const nameCut = name.split(' '); // suppression de l'espace entre le nom et prénom et retourne un tableau
      const resultLastName = nameCut[1]; // on récupère la 2eme valeur du tableau : nom de famille
      lastName = resultLastName;
    }
  });

  // affichage des médias du photographe (pattern factory)
  photographersMedia.forEach((element) => {
    if (element.photographerId === newGetId) {
      const addMedias = MediasFactory.buildMedia(element);
      document.getElementById('works-list').innerHTML += addMedias.build(lastName);
    }
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
