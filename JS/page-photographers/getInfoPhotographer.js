/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import {
  showPhotograph,
  titlePagePhotograph,
} from './const_page-photographers.js';
import { newGetId } from './functions_page-photographers.js';

// REQUETE POUR AFFICHER LES INFOS

export const getInfoPhotographer = async () => {
  const response = await fetch('./JS/data.json');
  const data = await response.json().catch((err) => {
    // Une erreur est survenue
    err();
  });

  const photographersList = data.photographers;

  // on ajoute les informations des photographes en debut de page

  // on va rechercher dans le Json l'id correspondant à la variable newGetId avec la methode find
  photographersList.find((element) => {
    if (element.id === newGetId) {
      showPhotograph.innerHTML += `<div id = "${element.id}" class="presentation">
                    <h1>${element.name}</h1>
                        <p>${element.city}, ${element.country}</p>
                        <p>${element.tagline}</p>
                    <ul id="tagsList${element.tags}"></ul>
                </div>
                <div id ="id-photo">
                    <img src="/Photos/gallery/Photographers-Photos/${element.portrait}"alt ="${element.description}">
                </div>`;
      const showTagsList = document.getElementById(`tagsList${element.tags}`);
      element.tags.forEach((allTags) => {
        showTagsList.innerHTML += `<li class ="tags"><a class = "links" href="index.html?tags-${allTags}"> #${allTags}</a></li>`;
      });

      // ajout du nom du photographe en tant que titre de la page
      titlePagePhotograph.innerHTML += element.name;
      return true;
    }
    return false;
  });
};
