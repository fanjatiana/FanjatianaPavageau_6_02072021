/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/extensions
import { enableBodyScroll, disableBodyScroll } from './body-scroll-lock.js';

export class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'),
    );
    const gallery = links.map((link) => link.getAttribute('href'));
    const arrayTitle = links.map((link) => link.getAttribute('title'));
    const arrayAlt = links.map((img) => img.firstElementChild.getAttribute('alt'));

    /* on applique un évènement au clic sur les liens
    pour récupérer les attributs de l'élément ciblié */
    links.forEach((link) => link.addEventListener('click', (e) => {
      e.preventDefault();

      new Lightbox(
        e.currentTarget.getAttribute('href'),
        gallery,
        e.currentTarget.getAttribute('title'),
        arrayTitle,
        e.currentTarget.firstElementChild.getAttribute('alt'),
        arrayAlt,
      );
    }));
  }

  // on cré un constructor pour créer un nouvel objet de la LightBox
  constructor(url, images, title, baliseTitle, alt, baliseAlt) {
    this.element = this.buildDOM(url);
    this.images = images;
    this.title = title;
    this.baliseTitle = baliseTitle;
    this.alt = alt;
    this.baliseAlt = baliseAlt;
    this.loadMedia(url, title, alt);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    disableBodyScroll(this.element);
    document.addEventListener('keydown', this.onKeyUp);
  }

  // ajout des images et viéos avec leurs attribus alt et title dans la lightBox au click des urls
  loadMedia(url, title, alt) {
    if (url.includes('.jpg')) {
      this.url = null;
      const image = new Image(); /* document.createElement("image") */
      const container = this.element.querySelector('.lightbox__container');
      const text = document.createElement('p');

      container.innerHTML = '';
      this.alt = alt;

      this.url = url;
      this.title = title;
      image.alt = alt;
      image.src = url;

      container.appendChild(image);
      container.appendChild(text);
      text.innerHTML = title;
    }

    if (url.includes('.mp4')) {
      const video = document.createElement('video');
      const textVideo = document.createElement('p');
      const container = this.element.querySelector('.lightbox__container');
      container.innerHTML = '';
      this.url = url;
      this.title = title;
      this.alt = alt;
      container.appendChild(video);
      video.controls = true;
      video.src = url;
      video.alt = alt;
      container.appendChild(textVideo);
      textVideo.innerHTML = title;
    }
  }

  /* accessibilité clavier des flèches de navigation et de la croix de fermeture de la lightBox */
  onKeyUp(e) {
    const focusOnElement = Array.from(
      document.querySelectorAll('.lightbox > button, .lightbox__container > video'),
    );

    // on recupère le premier bouton qui portera le focus
    const firstButton = focusOnElement[0];
    // on récupère le dernier bouton qui portera le focus
    const lastButton = focusOnElement[focusOnElement.length - 1];
    if (e.key === 'Escape') {
      this.close(e);
    } else if (e.key === 'ArrowLeft') {
      this.prev(e);
    } else if (e.key === 'ArrowRight') {
      this.next(e);
    } else if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (e.target === firstButton) {
          e.preventDefault();
          lastButton.focus();
        }
      } else if (e.target === lastButton) {
        e.preventDefault();
        firstButton.focus();
      }

      // vérifie si aucun boutton n'a le focus, si "true" alors :
      if (!focusOnElement.includes(document.activeElement)) {
        e.preventDefault();
        firstButton.focus();
      }
    }
  }

  // fonction pour fermer la modale
  close(e) {
    e.preventDefault();
    this.element.classList.add('fadeOut');
    enableBodyScroll(this.element);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  // fonction pour faire défiler la gallerie vers la droite et revenir sur la première photo/vidéo
  next(e) {
    e.preventDefault();
    let nextImg = this.images.findIndex((image) => image === this.url);
    let nextTitle = this.baliseTitle.findIndex(
      (element) => element === this.title,
    );
    let nextAlt = this.baliseAlt.findIndex(
      (attribute) => attribute === this.alt,
    );
    if (
      nextImg === this.images.length - 1
      && nextTitle === this.baliseTitle.length - 1
      && nextAlt === this.baliseAlt.length - 1
    ) {
      nextImg = -1;
      nextTitle = -1;
      nextAlt = -1;
    }
    this.loadMedia(
      this.images[nextImg + 1],
      this.baliseTitle[nextTitle + 1],
      this.baliseAlt[nextAlt + 1],
    );
  }

  // fonction pour faire défiler la gallerie vers la gauche et revenir sur la première photo/vidéo
  prev(e) {
    e.preventDefault();

    let prevImg = this.images.findIndex((image) => image === this.url);
    let prevTitle = this.baliseTitle.findIndex(
      (element) => element === this.title,
    );
    let prevAlt = this.baliseAlt.findIndex(
      (attribute) => attribute === this.alt,
    );
    if (prevImg === 0 && prevTitle === 0 && prevAlt === 0) {
      prevImg = this.images.length;
      prevTitle = this.baliseTitle.length;
      prevAlt = this.baliseAlt.length;
    }

    this.loadMedia(
      this.images[prevImg - 1],
      this.baliseTitle[prevTitle - 1],
      this.baliseAlt[prevAlt - 1],
    );
  }

  /* fonction pour ajouter les boutons de navigation dans le DOM
et ajout d'un évènement au clic de ces boutons */
  buildDOM() {
    const dom = document.createElement('div');
    dom.classList.add('lightbox');
    document.querySelector('main').setAttribute('aria-hidden', 'true');
    dom.setAttribute('aria-hidden', 'false');
    dom.innerHTML = `<button
            class="lightbox__close">fermer</button>
            <button class="lightbox__next">suivant</button>
            <button class="lightbox__prev">précédent</button>
            <div class="lightbox__container"></div>`;
    dom
      .querySelector('.lightbox__close')
      .addEventListener('click', this.close.bind(this));
    dom
      .querySelector('.lightbox__next')
      .addEventListener('click', this.next.bind(this));
    dom
      .querySelector('.lightbox__prev')
      .addEventListener('click', this.prev.bind(this));
    return dom;
  }
}
