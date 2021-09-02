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
  const photographersMedia = data.media;

  let lastName = "";
  (function () {
    for (let namePhotograph of photographersList) {
      if (namePhotograph.id === newGetId) {
        let name = namePhotograph.name;
        let nameCut = name.split(" ");
        lastName = nameCut[1];
      }
    }
  })();

  //fonction pour ajouter les informations des photographes en debut de page
  function addInfoOfPhotographer() {
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
  }

  addInfoOfPhotographer();

  //fonction pour afficher et fermer le formulaire de contact
  function showModal() {
    //fonction affichage  du formulaire
    function launchModal() {
      document.getElementById("modale").style.display = "block";
      document.getElementById("modale").setAttribute("aria-hidden", false);

      const btnClose = document.getElementById("btnForm-close");
      const textarea = document.getElementById("yourmessage");

      let arrayElementForm = [
        ...document.querySelectorAll("input"),
        textarea,
        btnClose,
      ];

      const firstFocus = arrayElementForm[0];
      firstFocus.focus();

      const lastFocus = arrayElementForm[3];

      arrayElementForm.forEach((elementFocus) => {
        if (elementFocus.addEventListener) {
          elementFocus.addEventListener("keydown", function (event) {
            const pressTab = event.key === "Tab";

            if (!pressTab) {
              return;
            }

            if (event.shiftKey) {
              if (event.target === firstFocus) {
                event.preventDefault();
                console.log(lastFocus.focus());
              }
            } else if (event.target === lastFocus) {
              event.preventDefault();
              firstFocus.focus();
            }
          });
        }
      });
    }
    document.getElementById("btn").addEventListener("click", launchModal);

    //fonction fermeture du formulaire
    const closeModal = () => {
      document.getElementById("modale").style.display = "none";
      document.getElementById("modale").setAttribute("aria-hidden", true);
    };
    document.querySelector(".close").addEventListener("click", closeModal);

    document.getElementById("modale").addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeModal();
      }
    });

    //fonction pour ajouter le nom du photographe dans le formulaire
    (function () {
      const titleName = document.getElementById("recipient-name");
      for (let element of photographersList) {
        if (element.id === newGetId) {
          titleName.innerHTML = `Contactez-moi<br>${element.name}`;
        }
      }
    })();
  }
  showModal();

  //fonction de controle du formulaire et de son envoie
  function controlForm() {
    const regexNameAndLastName = /^[A-Za-z ,.'-]+$/i;
    const regexEmail =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const infoGuest = document.querySelectorAll(".info-id");
    const infoEmail = document.getElementById("email");
    const message = document.getElementById("yourmessage");

    /*fonction controle de la validité des champs nom et prénom*/
    const controlInput = () => {
      let count = 0;
      infoGuest.forEach((info) => {
        if (info.validity.valueMissing) {
          info
            .closest(".info-form")
            .setAttribute("data-error", "Veuillez remplir le formulaire");
          info.style.border = "#f70707 3px solid";
        } else if (info.value.length < 2) {
          info
            .closest(".info-form")
            .setAttribute(
              "data-error",
              "Veuillez entrer entre 2 et 30 caractères pour valider ce champ "
            );
          info.style.border = "#f70707 3px solid";
        } else if (!regexNameAndLastName.test(info.value)) {
          info
            .closest(".info-form")
            .setAttribute(
              "data-error",
              " Ecrivez en miniscule ou majuscule , pas de nombre, seuls caractères autorisés: . - ' et espaces"
            );
          info.style.border = "#f70707 3px solid";
        } else {
          info.closest(".info-form").setAttribute("data-error", "");
          info.style.border = "green 3px solid";
          count++;
        }
      });
      if (count == infoGuest.length) {
        return true;
      }
    };
    //fonction controle de la validité du champs email
    const controlEmail = () => {
      if (infoEmail.validity.valueMissing) {
        infoEmail
          .closest(".info-form")
          .setAttribute("data-error", "Veuillez remplir ce champ");
        infoEmail.style.border = "#f70707 3px solid";
      } else if (!regexEmail.test(infoEmail.value)) {
        infoEmail
          .closest(".info-form")
          .setAttribute(
            "data-error",
            "Veuillez rentrer une adresse email valide (par exemple: monemail@yahoo.com"
          );
        infoEmail.style.border = "#f70707 3px solid";
      } else {
        infoEmail.closest(".info-form").setAttribute("data-error", "");
        infoEmail.style.border = "green 3px solid";

        return true;
      }
    };
    //fonction controle de la validité du message entrant
    const controlMessage = () => {
      if (message.value == "") {
        message
          .closest(".info-form")
          .setAttribute("data-error", "Veuillez remplir ce champ");
        message.style.border = "#f70707 3px solid";
      } else {
        message.closest(".info-form").setAttribute("data-error", "");
        message.style.border = "green 3px solid";
        return true;
      }
    };

    //fonction de validation du formulaire
    const controlValidateForm = () => {
      //event.preventDefault();
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
    };
    /*fonction d'envoie du formulaire si controlValidateForm ===true*/
    (function () {
      const submitForm = document.getElementById("submit-form");
      submitForm.addEventListener("click", controlValidateForm, (event) => {
        event.preventDefault();
      });
    })();
  }

  controlForm();
};