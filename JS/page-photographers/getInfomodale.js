/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { newGetId } from './functions_page-photographers.js';

import {
  launchModal, closeModal, accessModalKeyboard, controlInput, controlEmail, controlMessage,
} from './function_modale.js';

export const getInfoModale = async () => {
  const response = await fetch('./JS/data.json');
  const data = await response.json().catch((error) => {
    // Une erreur est survenue
    console.log(error);
  });

  const photographersList = data.photographers;

  // ouverture  du formulaire au click
  document.getElementById('btn').addEventListener('click', launchModal);

  // ouverture et navigation du formulaire au clavier
  accessModalKeyboard();

  // fermeture du formulaire au click
  document.querySelector('.close').addEventListener('click', closeModal);

  // fermeture du formulaire au clavier
  document.getElementById('modale').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Ajout du nom du photographe dans le formulaire de contact en fonction de son ID
  const titleName = document.getElementById('recipient-name');
  photographersList.forEach((element) => {
    if (element.id === newGetId) {
      titleName.innerHTML = `Contactez-moi<br>${element.name}`;
    }
  });

  const regexNameAndLastName = /^[A-Za-z ,.'-]+$/i;
  const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const infoGuest = document.querySelectorAll('.info-id');
  const infoEmail = document.getElementById('email');
  const message = document.getElementById('yourmessage');

  // fonction de controle de validation du formulaire
  const controlValidateForm = (event) => {
    event.preventDefault();
    const inputValid = controlInput(infoGuest, regexNameAndLastName);
    const emailValid = controlEmail(infoEmail, regexEmail);
    const messageValid = controlMessage(message);
    /* on verifie la validité de chaques input puis on ferme le modale si c'est "true" */
    if (inputValid && emailValid && messageValid) {
      document.getElementById('modale').style.display = 'none';
      return true;
    }
    return false;
  };

  /* évènement au clic du bouton d'envoie
  pour l'envoie du formulaire si controlValidateForm === true */
  const submitForm = document.getElementById('submit-form');
  submitForm.addEventListener('click', controlValidateForm, (event) => {
    event.preventDefault();
  });
};
