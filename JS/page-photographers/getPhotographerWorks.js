import { Lightbox } from "./LightBox/lightbox.js";
import { newGetId } from "./functions_page-photographers.js";
import { addImage, addVideo } from "./functions_page-photographers.js";

export const getPhotographersWorks = async () => {
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

  //fonction pour afficher les images

  //ajout des images
  for (let element of photographersMedia) {
    if (element.photographerId === newGetId && element.image) {
      addImage(element, lastName);
    }
  }



  //ajout des vidéos
  for (let element of photographersMedia) {
    if (element.photographerId === newGetId && element.video) {
      addVideo(element, lastName);
    }
  }

  //fonction pour afficher le compteur de like
  function CounterLikes() {
    /****************************************************partie compteur prix/jour********************************/
    let totalPrice = [];

    //on recupere tous les prix du photographe  et on les ajoute dans un tableau
    photographersList.forEach((value) => {
      if (value.id === newGetId) {
        totalPrice.push(value.price);
      }
    });

    //on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
    let priceOfPhotographers = 0;
    for (let price = 0; price < totalPrice.length; price++) {
      priceOfPhotographers += parseFloat(totalPrice[price]);
    }

    //on recupere tous les likes du photographeet on les ajoute dans un tableau
    let totalLikes = [];
    photographersMedia.forEach((value) => {
      if (value.photographerId === newGetId) {
        totalLikes.push(value.likes);
      }
    });

    //on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
    let likesOfPhotographers = 0;
    for (let nbLike = 0; nbLike < totalLikes.length; nbLike++) {
      likesOfPhotographers += parseFloat(totalLikes[nbLike]);
    }

    // ajout du bloc compteur de like
    (function () {
      document.getElementById(
        "works-list"
      ).innerHTML += `<div id="like_counter">
        <p id="total-likes">${likesOfPhotographers}<i class="fas fa-heart"></i></p>
        <p>${priceOfPhotographers}€ / jour</p>
        </div>`;
    })();

    //fonction incrémentation des likes et du compteur de likes
    function incrementMediaLikes() {
      const buttonHearts = document.querySelectorAll(".likes_media");
      buttonHearts.forEach((heart) => {
        heart.addEventListener("click", function () {
          let arrayValue = heart.previousElementSibling;
          console.log(arrayValue);
          let likeCount = Number(arrayValue.innerText);
          likeCount += 1;
          arrayValue.innerHTML = "";
          arrayValue.innerHTML = `${likeCount}`;
          document.getElementById(
            "total-likes"
          ).innerHTML = `${likesOfPhotographers++}<i class="fas fa-heart"></i>`;
        });
      });
    }
    incrementMediaLikes();
  }

  CounterLikes();

  Lightbox.init();

  //fonction pour afficher la lightBox
};
