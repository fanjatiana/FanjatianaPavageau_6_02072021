import {
  showPhotograph,
  titlePagePhotograph,
} from "./let-and-const_page-photographers.js";
import { newGetId } from "./functions_page-photographers.js";

/***********************************************************************************************************************/
/*REQUETE POUR AFFICHER LES INFOS + FORMULAIRE DE CONTACT DU PHOTOGRAPHE/

/***********************************************************************************************************************/

export const getInfoPhotographer = async () => {
  const response = await fetch("./JS/data.json");
  const data = await response.json().catch(function error(err) {
    // Une erreur est survenue
    alert(err);
  });

  const photographersList = data.photographers;

  //on récupère le nom du photographe dans le Json
  let lastName = "";
    for (let namePhotograph of photographersList) {
      if (namePhotograph.id === newGetId) {
        let name = namePhotograph.name; 
        let nameCut = name.split(" "); //supression des espaces
        lastName = nameCut[1]; // on récupère la 2eme valeur du tableau : nom de famille   
      }
    }


  //on ajoute les informations des photographes en debut de page

  // on va rechercher dans le Json l'id correspondant à la variable newGetId avec la methode find
  photographersList.find((element) => {
    if (element.id === newGetId) {
      //on ajoute le contenu html avec les données de chaques photographes correspondant à l Id de l'url
      showPhotograph.innerHTML += `<div id = "${element.id}" class="presentation">
                    <h1>${element.name}</h1>
                        <p>${element.city}, ${element.country}</p>
                        <p>${element.tagline}</p>
                    <ul id="tagsList${element.tags}"></ul>
                </div>
                <div id ="id-photo">
                    <img src="/Photos/gallery/Photographers-Photos/${element.portrait}"alt ="${element.description}">
                </div>`;
      let showTagsList = document.getElementById("tagsList" + element.tags);
      element.tags.forEach((allTags) => {
        showTagsList.innerHTML += `<li class ="tags"><a class = "links" href="index.html?tags-${allTags}"> #${allTags}</a></li>`;
      });

      //ajout du nom du photographe en tant que titre de la page
      titlePagePhotograph.innerHTML += element.name;
    }
  });
};
