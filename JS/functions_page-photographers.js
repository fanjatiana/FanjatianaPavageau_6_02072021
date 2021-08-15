 import { showPhotograph, titlePagePhotograph} from "./let-and-const_page-photographers.js";
 import { photographersList } from "./let-and-const_index.js";
 import {getUrl_id} from "./variables.js";
 
// fonction pour récupérer l'id des photographes dans l'URL
 let newGetId = "";
 (function() {
      // on extrait l id
    let getId = getUrl_id.slice(4);

    //on modifie type de GetId string--> number
    newGetId = Number(getId);
 })();
 
 
 //fonction pour ajouter les infos des photographes en debut de page
 export function addInfoOfPhotographer (){
    // on va rechercher dans le Json l'id correspondant à la variable newGetId avec la methode find
    photographersList.find((element) => {
        if (element.id === newGetId) {
            /***********************************************ajout des informations du photographe************************************************************/

            //on ajoute le contenu html avec les données de chaques photographes correspondant à l Id de l'url
            showPhotograph.innerHTML +=
                `<div id = "presentation ${element.id}">
                    <h1>${element.name}</h1>
                        <p>${element.city}, ${element.country}</p>
                        <p>${element.tagline}</p>
                    <ul id="tagsList${element.tags}"></ul>
                </div>
                <div id ="id-photo">
                    <img src="/Photos/gallery/Photographers-Photos/${element.portrait}">
                </div>`
            let showTagsList = document.getElementById("tagsList" + element.tags);
            element.tags.forEach(allTags => {
                showTagsList.innerHTML +=
                    `<li class ="tags"><a class = "links" href="#"> #${allTags}</a></li>`
            })

            //ajout du nom du photographe en tant que titre de la page
            titlePagePhotograph.innerHTML += element.name;
        };
})
 }


 export function showModal (){
    /*********************fonction ouverture/fermeture du formulaire + ajout du nom du photographe en dynamique******************************************/

    const btnContact = document.getElementById("btn");
     const modaleWindow = document.getElementById("modale");
     const btnCloseModal = document.querySelector(".close");

    //fonction affichage  du formulaire
    function launchModal() {
        modaleWindow.style.display = "block";
    }

    btnContact.addEventListener("click", launchModal);

    //fonction fermeture du formulaire 
    const closeModal = () => {
        modaleWindow.style.display = "none";
    }

    btnCloseModal.addEventListener("click", closeModal);
   
}

export function addNameOnModal (){
    //h2 : ajout nom du photographe dans le formulaire avec une boucle for
    const titleName = document.getElementById("recipient-name");
    for (let element of photographersList) {
        if (element.id === newGetId) {
            titleName.innerHTML = `Contactez-moi<br>${element.name}`;

        }
    }
}




