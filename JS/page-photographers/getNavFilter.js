/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { works, worksFilter } from './const_page-photographers.js';
import { Lightbox } from './LightBox/lightbox.js';
import {
  addImage,
  addVideo,
  newGetId,
  infoLikesAndPrice,
} from './functions_page-photographers.js';

// requête pour la partie filtre de la page des photographes
export const getNavFilter = async () => {
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
      const nameCut = name.split(' '); // supression des espaces
      const resultLastName = nameCut[1]; // on récupère la 2eme valeur du tableau : nom de famille
      lastName = resultLastName;
    }
  });

  // ajout du menu déroulant : trier par
  worksFilter.innerHTML += `<label for="list-filter">Trier par</label>
  <select name="filter" id="list-filter">
      <option class="by-popular" value="Popularité">Popularité</option>
      <option class="sort_by_date" value="Date">Date</option>
      <option class="sort_by_title"  value="Titre">Titre</option>
      </select>`;

  // fonction de trie par Dates
  const sortByDate = () => {
    const arrayDate = [];
    /* on recupère toutes les dates des médias correspondant à l id du photographe,
     et on les ajoute dans un tableau */
    photographersMedia.forEach((valueDate) => {
      if (valueDate.photographerId === newGetId) {
        arrayDate.push(valueDate);
      }
    });

    /* on organise les médias du photographes en fonction des dates
     (de la plus récente à la plus ancienne) */
    const date = (e) => e.date;
    let orderByDate = [];
    orderByDate = arrayDate.sort(date).reverse();

    // on affiche toutes les images/videos rangées par date et liées à l'Id du photographe
    orderByDate.forEach((element) => {
      if (element.photographerId === newGetId && element.image) {
        addImage(element, lastName);
      }
      if (element.photographerId === newGetId && element.video) {
        addVideo(element, lastName);
      }
    });
  };

  // fonction de trie des likes dans le fichier JSON
  const sortByLikes = () => {
    const arrayLikes = [];
    photographersMedia.forEach((nbLikes) => {
      if (nbLikes.photographerId === newGetId) {
        arrayLikes.push(nbLikes);
      }
    });

    // on organise les médias du photographes en fonction des likes (ordre décroissant)

    // fonction pour ranger les likes dans l'ordre décroissant
    const byLikes = (a, b) => b.likes - a.likes;
    const orderByLikes = arrayLikes.sort(byLikes);

    // on affiche toutes les images/vidéos liées à l'Id du photographe
    orderByLikes.forEach((element) => {
      if (element.photographerId === newGetId && element.image) {
        addImage(element, lastName);
      }
      if (element.photographerId === newGetId && element.video) {
        addVideo(element, lastName);
      }
    });
  };

  // fonction de trie des titres dans le fichier JSON
  const sortByABC = () => {
    const arrayMediaTitle = [];
    photographersMedia.forEach((titleMedia) => {
      if (titleMedia.photographerId === newGetId) {
        arrayMediaTitle.push(titleMedia);
      }
    });

    // on organise les médias du photographes en fonction des titres (ordre alphabétique)
    const orderByTitle = arrayMediaTitle.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });

    // on affiche toutes les images et vidéos liées à l'Id du photographe
    orderByTitle.forEach((element) => {
      if (element.photographerId === newGetId && element.image) {
        addImage(element, lastName);
      }
      if (element.photographerId === newGetId && element.video) {
        addVideo(element, lastName);
      }
    });
  };

  // on recupere tous les prix du photographe  et on les ajoute dans un tableau
  const totalPrice = [];
  photographersList.forEach((value) => {
    if (value.id === newGetId) {
      totalPrice.push(value.price);
    }
  });

  // on applique un évènement au click sur le bouton select pour pouvoir afficher le contenu filtré
  const buttonSelect = document.querySelector('select');

  buttonSelect.addEventListener('click', () => {
    if (buttonSelect.value === 'Popularité') {
      works.innerHTML = '';
      sortByLikes();
      infoLikesAndPrice(totalPrice);
      Lightbox.init();
    } else if (buttonSelect.value === 'Titre') {
      // affichage de la gallerie triée par ordre alphabétique au clic du lien : Titre
      works.innerHTML = '';
      sortByABC();
      infoLikesAndPrice(totalPrice);
      Lightbox.init();
    } else if ((buttonSelect.value === 'Date')) {
      // affichage de la gallerie triée  par date au clic du lien : Date
      works.innerHTML = '';
      sortByDate();
      infoLikesAndPrice(totalPrice);
      Lightbox.init();
    }
  });
};
