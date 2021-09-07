// requête pour afficher la liste des photographes au chargement de la page

/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { addContent } from './functions_index.js';
import { getUrlTag } from '../page-photographers/const_page-photographers.js';

export const getPhotographersList = async () => {
  const response = await fetch('./JS/data.json');
  const data = await response.json().catch((error) => {
    // Une erreur est survenue
    console.log(error);
  });
  const photographersList = data.photographers;

  // ajout de la div : passer au contenu dans le html
  const body = document.querySelector('body');
  body.insertAdjacentHTML(
    'afterbegin',
    `<div id ="go-to-content">
            <a class="link_go-to-content" href="#gallery-photographers" title="cliquez pour passer au contenu">
                <h3>Passer au contenu</h3>
            </a>
        </div>`,
  );

  // évènement d'apparition de la div au scroll de la page
  const divGoToContent = document.getElementById('go-to-content');
  body.onscroll = () => {
    divGoToContent.style.display = 'block';
  };

  /* fonction pour récupérer le tag dans l'url :
   on extrait le nom du tag avec la méthode slice */
  let getTag = '';
  getTag = getUrlTag.slice(6);

  // Affichage de la liste des photographes au chargement de la page (si absence de tags dans l url)
  if (getTag === '') {
    photographersList.forEach((element) => {
      addContent(element);
    });

    /* Affichage de  la liste des photographes en
    fonction du tag situé dans l'url (selectionné depuis la page photographes) */
  } else {
    document.getElementById('container').innerHTML = '';
    photographersList.forEach((element) => {
      if (element.tags.includes(getTag)) {
        addContent(element);
      }
    });
  }
};
