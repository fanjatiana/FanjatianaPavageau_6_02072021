// eslint-disable-next-line import/extensions
import { disableBodyScroll } from './LightBox/body-scroll-lock.js';

// fonction pour l'ouverture du formulaire
export const launchModal = () => {
  document.getElementById('modale').style.display = 'block';
  document.getElementById('modale').setAttribute('aria-hidden', false);
  disableBodyScroll(document.querySelector('main'));
  document.getElementById('first').focus();
};

// fonction pour la fermeture du formulaire
export const closeModal = () => {
  document.getElementById('modale').style.display = 'none';
  document.getElementById('modale').setAttribute('aria-hidden', true);
};

// fonction pour l'accessibilité du formulaire au clavier
export const accessModalKeyboard = () => {
  const btnClose = document.getElementById('btnForm-close');
  const textarea = document.getElementById('yourmessage');

  const arrayElementForm = [
    ...document.querySelectorAll('input'),
    textarea,
    btnClose,
  ];
  const firstFocus = arrayElementForm[5];
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
};

/* fonction de controle de la validité des champs nom et prénom */
export const controlInput = (infoGuest, regexNameAndLastName) => {
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

// fonction de controle de la validité du champs email
export const controlEmail = (infoEmail, regexEmail) => {
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
    return true;
  }
  return false;
};

// fonction de controle de la validité du message entrant
export const controlMessage = (message) => {
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
