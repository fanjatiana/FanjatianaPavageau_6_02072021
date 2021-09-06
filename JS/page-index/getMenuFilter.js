// requête pour filtrer la liste des photographes

// eslint-disable-next-line import/extensions
import { addContent } from './functions_index.js';

// eslint-disable-next-line import/prefer-default-export
export const getMenuFilter = async () => {
  const response = await fetch('./JS/data.json');
  const data = await response.json().catch((err) => {
    // Une erreur est survenue
    err();
  });
  const photographersList = data.photographers;

  /* fonction pour afficher les photographes filtrés en fonction des tags:
  on va chercher dans le Json les photographes qui ont le tag sélèctionnné
  puis on ajoute la liste des photographes filtrées dans le html */
  const tagsFilter = (filter) => {
    document.getElementById('container').innerHTML = '';
    photographersList.forEach((photograph) => {
      if (photograph.tags.includes(filter)) {
        addContent(photograph);
      }
    });
  };

  /* on applique un listener sur les liens des tags
(tags de la navigation et les tags des photographes) */
  const allTags = document.querySelectorAll('.links');
  allTags.forEach((tags) => {
    const resultFilter = tags.innerHTML.replace('#', ''); // suppression des # des tags du tableau pour pouvoir effectuer la comparaison dans le JSON
    tags.addEventListener('click', (event) => {
      tagsFilter(resultFilter);
      event.preventDefault();
    });
  });
};
