/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { newGetId } from './functions_page-photographers.js';
import { disableBodyScroll } from './LightBox/body-scroll-lock.js';

export const getInfoModale = async () => {
  const response = await fetch('./JS/data.json');
  const data = await response.json().catch((err) => {
    // Une erreur est survenue
    err();
  });

  const photographersList = data.photographers;

  // OUVERTURE ET FERMETURE DU FORMULAIRE

  // ouverture  du formulaire au click
  function launchModal() {
    document.getElementById('modale').style.display = 'block';
    document.getElementById('modale').setAttribute('aria-hidden', false);
    disableBodyScroll(document.querySelector('main'));
    document.getElementById('first').focus();
  }
  document.getElementById('btn').addEventListener('click', launchModal);

  // ouverture du formulaire au clavier
  const btnClose = document.getElementById('btnForm-close');
  const textarea = document.getElementById('yourmessage');

  const arrayElementForm = [
    ...document.querySelectorAll('input'),
    textarea,
    btnClose,
  ];
  const firstFocus = arrayElementForm[0];
  firstFocus.focus();
  const lastFocus = arrayElementForm[3];

  arrayElementForm.forEach((elementFocus) => {
    if (elementFocus.addEventListener) {
      elementFocus.addEventListener('keydown', (event) => {
        const pressTab = event.key === 'Tab';
        if (!pressTab) {
          return;
        }
        if (event.shiftKey) {
          if (event.target === firstFocus) {
            event.preventDefault();
          }
        } else if (event.target === lastFocus) {
          event.preventDefault();
          firstFocus.focus();
        }
      });
    }
  });

  // fermeture du formulaire au click
  const closeModal = () => {
    document.getElementById('modale').style.display = 'none';
    document.getElementById('modale').setAttribute('aria-hidden', true);
  };
  document.querySelector('.close').addEventListener('click', closeModal);

  // fermeture du formulaire au clavier
  document.getElementById('modale').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // AJOUT DU NOM DU PHOTOGRAPHE DANS LE FORMULAIRE EN FONCTION DE SON ID
  const titleName = document.getElementById('recipient-name');
  photographersList.forEach((element) => {
    if (element.id === newGetId) {
      titleName.innerHTML = `Contactez-moi<br>${element.name}`;
    }
  });

  // fonction de controle du formulaire et de son envoie
  const regexNameAndLastName = /^[A-Za-z ,.'-]+$/i;
  const regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const infoGuest = document.querySelectorAll('.info-id');
  const infoEmail = document.getElementById('email');
  const message = document.getElementById('yourmessage');

  /* fonction controle de la validité des champs nom et prénom */
  const controlInput = () => {
    let count = 0;

    infoGuest.forEach((input) => {
      if (input.validity.valueMissing) {
        input
          .closest('.info-form')
          .setAttribute('data-error', 'Veuillez remplir le formulaire');
        input.style.border = '#f70707 3px solid';
      } else if (input.value.length < 2) {
        input
          .closest('.info-form')
          .setAttribute(
            'data-error',
            'Veuillez entrer entre 2 et 30 caractères pour valider ce champ ',
          );
        input.style.border = '#f70707 3px solid';
      } else if (!regexNameAndLastName.test(input.value)) {
        input
          .closest('.info-form')
          .setAttribute(
            'data-error',
            " Ecrivez en miniscule ou majuscule , pas de nombre, seuls caractères autorisés: . - ' et espaces",
          );
        input.style.border = '#f70707 3px solid';
      } else {
        input.closest('.info-form').setAttribute('data-error', '');
        input.style.border = 'green 3px solid';
        count += 1;
      }
    });

    /* on compte le nombre de champ validé */
    if (count === infoGuest.length) {
      return true;
    }
    return false;
  };

  // fonction controle de la validité du champs email
  const controlEmail = () => {
    if (infoEmail.validity.valueMissing) {
      infoEmail
        .closest('.info-form')
        .setAttribute('data-error', 'Veuillez remplir ce champ');
      infoEmail.style.border = '#f70707 3px solid';
    } else if (!regexEmail.test(infoEmail.value)) {
      infoEmail
        .closest('.info-form')
        .setAttribute(
          'data-error',
          'Veuillez rentrer une adresse email valide (par exemple: monemail@yahoo.com',
        );
      infoEmail.style.border = '#f70707 3px solid';
    } else {
      infoEmail.closest('.info-form').setAttribute('data-error', '');
      infoEmail.style.border = 'green 3px solid';
    }
    return true;
  };

  // fonction controle de la validité du message entrant
  const controlMessage = () => {
    if (message.value === '') {
      message
        .closest('.info-form')
        .setAttribute('data-error', 'Veuillez remplir ce champ');
      message.style.border = '#f70707 3px solid';
    } else {
      message.closest('.info-form').setAttribute('data-error', '');
      message.style.border = 'green 3px solid';
      return true;
    }
    return false;
  };

  // fonction de validation du formulaire
  const controlValidateForm = (event) => {
    event.preventDefault();
    const inputValid = controlInput();
    const emailValid = controlEmail();
    const messageValid = controlMessage();
    /* on verifie la validité de chaques input puis on ferme le modale si c'est "true"
        et enfin on  affiche un message de validation d'envoie du formulaire */
    if (inputValid && emailValid && messageValid) {
      document.getElementById('modale').style.display = 'none';
      return true;
    }
    return false;
  };
  /* fonction d'envoie du formulaire si controlValidateForm ===true */

  const submitForm = document.getElementById('submit-form');
  submitForm.addEventListener('click', controlValidateForm, (event) => {
    event.preventDefault();
  });
};
