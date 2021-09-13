/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { Lightbox } from './LightBox/lightbox.js';
import { newGetId, infoLikesAndPrice } from './functions_page-photographers.js';

export const getPhotographersWorks = async () => {
  const response = await fetch('./JS/data.json');
  const data = await response.json().catch((error) => {
    // Une erreur est survenue
    console.log(error);
  });

  const photographersList = data.photographers;
  const photographersMedia = data.media;

  // on récupère le nom du photographe dans le Json
  let lastName = '';

  photographersList.forEach((namePhotograph) => {
    if (namePhotograph.id === newGetId) {
      const { name } = namePhotograph; // on vient chercher dans le tableau la valeur de : name
      const nameCut = name.split(' '); // suppression de l'espace entre le nom et prénom et retourne un tableau
      const resultLastName = nameCut[1]; // on récupère la 2eme valeur du tableau : nom de famille
      lastName = resultLastName;
    }
  });

  // on affiche la gallerie des médias liées à l id affiché dans l'url
  const imagesFactory = (image, title, description, likes) => {
    const addImage = () => {
      document.getElementById('works-list').innerHTML += `<article>
                        <div class="gallery">
                            <a href="Photos/gallery/${lastName}/${image}" title="${title}">
                                <img class="pictures-list" src="./Photos/gallery/${lastName}/${image}" alt="${description}">
                            </a>
                        </div>
                        <div class="info_media">
                            <h2>${title}</h2>
                            <div class ="like">
                                <p class="nb-likes">${likes}</p>
                                <button class ="likes_media" type="button" aria-label="button-like">
                                    <i class="fas fa-heart "></i>
                                </button>
                            </div>    
                        </div>
                 </article>`;
    };

    return {
      image,
      title,
      description,
      likes,
      addImage,
    };
  };

  // on affiche la gallerie des médias liées à l id affiché dans l'url
  const videoFactory = (video, title, track, likes) => {
    const addVideo = () => {
      document.getElementById('works-list').innerHTML += `<article>
            <div class="gallery">
                <a href="Photos/gallery/${lastName}/${video}" title="${title}">
                    <video>
                    ${title}
                        <source src="./Photos/gallery/${lastName}/${video}" type="video/mp4">
                        <track kind="subtitles" src="./Photos/gallery/${lastName}/${track}" srclang="fr" label="francais">
                    </video>
                </a>
            </div>
            <div class="info_media">
                <h2>${title}</h2>
                <div class="like">
                    <p class="nb-likes">${likes}</p>
                    <button class="likes_media" type="button" aria-label="button-like">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>    
            </div>   
        </article>`;
    };

    return {
      video,
      title,
      track,
      likes,
      addVideo,
    };
  };

  // ajout des images et video
  photographersMedia.forEach((element) => {
    if (element.photographerId === newGetId && element.image) {
      const buildInfosImages = imagesFactory(
        element.image,
        element.title,
        element.description,
        element.likes,
      );
      const galleryImage = buildInfosImages.addImage;
      galleryImage();
    } else if (element.photographerId === newGetId && element.video) {
      const buildInfosVideos = videoFactory(
        element.video,
        element.title,
        element.track,
        element.likes,
      );
      const galleryVideo = buildInfosVideos.addVideo;
      galleryVideo();
    }
    return false;
  });

  // on recupere tous les prix du photographe  et on les ajoute dans un tableau
  const totalPrice = [];
  photographersList.forEach((value) => {
    if (value.id === newGetId) {
      totalPrice.push(value.price);
    }
  });
  // ajout du compteur de likes et de prix
  infoLikesAndPrice(totalPrice);

  // on affiche la lightBox au click des médias
  Lightbox.init();
};
