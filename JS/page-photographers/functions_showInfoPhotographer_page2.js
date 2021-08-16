 import { showPhotograph, titlePagePhotograph,getUrl_id} from "./let-and-const_page-photographers.js";
 import {photographersList} from "../page-index/let-and-const_index.js";

 
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

//fonction pour afficher et fermer la modale
 export function showModal (){
    /*********************fonction ouverture/fermeture du formulaire + ajout du nom du photographe en dynamique******************************************/

  

    //fonction affichage  du formulaire
    function launchModal() {
        document.getElementById("modale").style.display = "block";
    }

    document.getElementById("btn").addEventListener("click", launchModal);

    //fonction fermeture du formulaire 
    const closeModal = () => {
        document.getElementById("modale").style.display = "none";
    }

    document.querySelector(".close").addEventListener("click", closeModal);
   

    //fonction pour ajouter le nom du photographe dans la modale
(function (){
    //h2 : ajout nom du photographe dans le formulaire avec une boucle for
    const titleName = document.getElementById("recipient-name");
    for (let element of photographersList) {
        if (element.id === newGetId) {
            titleName.innerHTML = `Contactez-moi<br>${element.name}`;

        }
    }
})();
}


//fonction de controle du formulaire et de son envoie
export function controlForm (){
    const regexNameAndLastName = /^[A-Za-z ,.'-]+$/i;
    const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const infoGuest = document.querySelectorAll('.info-id');

   const infoEmail = document.getElementById("email");
    const message = document.getElementById("yourmessage");
/*fonction controle du formulaire*/
 const controlInput = () => {
    let count = 0;
    infoGuest.forEach(info => {
        if (info.validity.valueMissing) {
            info.closest(".info-form").setAttribute("data-error", "Veuillez remplir le formulaire");
            info.style.borderColor = "#f70707";

        } else if (info.value.length < 2) {
            info.closest(".info-form").setAttribute("data-error", "Veuillez entrer entre 2 et 30 caractères pour valider ce champ ");
            info.style.borderColor = "#f70707";

        } else if (!regexNameAndLastName.test(info.value)) {
            info.closest(".info-form").setAttribute("data-error", " Ecrivez en miniscule ou majuscule , pas de nombre, seuls caractères autorisés: . - ' et espaces");
            info.style.borderColor = "#f70707";


        } else {
            info.closest(".info-form").setAttribute("data-error", "");
            info.style.borderColor = "";
            count++
        }
    });
    if (count == infoGuest.length) {
        return true;
    }
}

 const controlEmail = () => {
    if (infoEmail.validity.valueMissing) {
        infoEmail.closest(".info-form").setAttribute("data-error", "Veuillez remplir ce champ");
        infoEmail.style.borderColor = "#f70707";

    } else if (!regexEmail.test(infoEmail.value)) {
        infoEmail.closest(".info-form").setAttribute("data-error", "Veuillez rentrer une adresse email valide (par exemple: monemail@yahoo.com");
        infoEmail.style.borderColor = "#f70707";

    } else {
        infoEmail.closest(".info-form").setAttribute("data-error", "");
        infoEmail.style.borderColor = "";
        return true;
    }

}
 const controlMessage = () => {
    if (message.value == "") {
        message.closest(".info-form").setAttribute("data-error", "Veuillez remplir ce champ");
        message.style.borderColor = "#f70707";

    } else {
        message.closest(".info-form").setAttribute("data-error", "");
        message.style.borderColor = "";
        return true;
    }
}

const controlValidateForm = () => {
    //event.preventDefault();
    /*on appelle toutes les fonctions*/
    const inputValid = controlInput();
    const emailValid = controlEmail();
    const messageValid = controlMessage();

    /*on verifie la validité de chaques input puis on ferme le modale si c'est "true" 
    et enfin on  affiche un message de validation d'envoie du formulaire*/
    if (inputValid && emailValid && messageValid) {
        document.getElementById("modale").style.display = "none";
    } else {
        return false;
    }

 

}

(function(){
    const submitForm = document.getElementById("submit-form");
    /*on cré un évènement au click sur le bouton submit avec la fonction validate  pour l'envoie du formulaire, 
et l'action par défaut du submit n'est pas exécuté tant que les valeurs sont : false*/
submitForm.addEventListener("click", controlValidateForm, (event) => {
   event.preventDefault();
});
})();
 
}
