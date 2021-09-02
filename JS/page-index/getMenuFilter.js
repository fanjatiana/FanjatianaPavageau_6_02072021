import { addContent, linksListener } from "./functions_index.js";

export const getMenuFilter = async (data) => {
  const response = await fetch("./JS/data.json");
  data = await response.json().catch(function error(err) {
    // Une erreur est survenue
    alert(err);
  });

  const photographersList = data.photographers;

   /*on vient appliquer un addEventListener sur les liens de la navigation et on les relie à la fonction filtre, pour afficher les éléments filtrés*/
   linksListener(addNavFilter);
  

    //fonction affichage des photographes filtrés
    function addNavFilter(filter) {
      document.getElementById("container").innerHTML = "";
      photographersList.forEach((photograph) => {
        if (photograph.tags.includes(filter)) {
          addContent(container, photograph);
        }
    
      });
        /*on vient appliquer un addEventListener sur les liens tags des photographes et on les relie à la fonction filtre, pour afficher les éléments filtrés*/
        linksListener(addNavFilter);
    }
  
   
  }
 

