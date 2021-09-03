import { addContent, linksListener } from "./functions_index.js";

export const getMenuFilter = async (data) => {
  const response = await fetch("./JS/data.json");
  data = await response.json().catch(function error(err) {
    // Une erreur est survenue
    alert(err);
  });

  const photographersList = data.photographers;

  function showPhotographersListFiltered() {
    /*on vient appliquer un addEventListener sur les liens de la navigation et on les relie à la fonction filtre, pour afficher les éléments filtrés*/
    linksListener(addNavFilter);

    //fonction affichage des photographes filtrés
    function addNavFilter(filter) {
      /* on vide la div container des articles*/
      document.getElementById("container").innerHTML = "";

      /*boucle forEach pour appliquer la fonction filtre sur les tags de chaque photographes puis on ajoute la liste des photographes filtrées dans le html*/
      photographersList.forEach((photograph) => {
        if (photograph.tags.includes(filter)) {
          addContent(container, photograph);
        }
      });

      //évènement au click des tags de la liste des photographe pour affocher la liste des photographes filtrés en fonction du theme choisi
      linksListener(addNavFilter);
    }
  }
  showPhotographersListFiltered();
};
