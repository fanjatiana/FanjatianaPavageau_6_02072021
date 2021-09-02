import { addContent } from "./functions_index.js";
import { getUrl_tag } from "../page-photographers/let-and-const_page-photographers.js";

export const getPhotographersList = async () => {
  const response = await fetch("./JS/data.json");
  const data = await response.json().catch(function error(err) {
    // Une erreur est survenue
    alert(err);
  });
  const photographersList = data.photographers;

  //ajout de la div : passer au contenu dans le html
  const body = document.querySelector("body");
  body.insertAdjacentHTML(
    "afterbegin",
    `<div id ="go-to-content">
            <a class="link_go-to-content" href = "#gallery-photographers" title = "cliquez pour passer au contenu">
                <h3>Passer au contenu</h3>
            </a>
        </div>`
  );

  //évènement d'apparition de la div au scroll de la page
  const divGoToContent = document.getElementById("go-to-content");
  body.onscroll = function () {
    divGoToContent.style.display = "block";
  };

  //fonction pour récupérer le tag dans l'url
  let getTag = "";
  (function () {
    // on extrait l id
    getTag = getUrl_tag.slice(6);
  })();

  //Affichage de la liste des photographes au chargement de la page en fonction de l'url
  if (getTag === "") {
    photographersList.forEach((element) => {
      addContent(container, element);
    });

    //Affichage de  la liste des photographes en fonction du tag situé dans l'url
  } else {
    container.innerHTML = "";
    photographersList.forEach((element) => {
      if (element.tags.includes(getTag)) {
        addContent(container, element);
      }
    });
  }
};
