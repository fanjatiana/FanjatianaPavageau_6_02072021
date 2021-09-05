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


    /* on vient appliquer un addEventListener sur les liens de la navigation
    et on les relie à la fonction filtre, pour afficher les éléments filtrés */
   
      const listLinksAFilter = document.querySelectorAll('.links');
    
      listLinksAFilter.forEach((navLinks) => {
        const resultFilter = navLinks.innerHTML.replace('#', '');
        navLinks.addEventListener('click', (event) => {
          addNavFilter(resultFilter);
          event.preventDefault();
        });
      })
 

    // fonction affichage des photographes filtrés
    function addNavFilter(filter) {
      // on vide la div container des articles
      document.getElementById('container').innerHTML = '';

      /* boucle forEach pour appliquer la fonction filtre sur les tags de chaque photographes
      puis on ajoute la liste des photographes filtrées dans le html */
      photographersList.forEach((photograph) => {
        if (photograph.tags.includes(filter)) {
          addContent(photograph);
        }
      });

    
    }

};
