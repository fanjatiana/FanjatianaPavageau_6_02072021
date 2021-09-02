
import { getUrl_id } from "./let-and-const_page-photographers.js";
import { works, worksFilter } from "./let-and-const_page-photographers.js";
import { Lightbox } from "./LightBox/lightbox.js";
import { addImage,addVideo} from "./functions_page-photographers.js";


export const getNavFilter = async () => {
  const response = await fetch("./JS/data.json");
  const data = await response.json().catch(function error(err) {
    // Une erreur est survenue
    alert(err);
  });

  const photographersList = data.photographers;
  const photographersMedia = data.media;

  let newGetId = "";
  (function () {
    // on extrait l id
    let getId = getUrl_id.slice(4);

    //on modifie type de GetId string--> number
    newGetId = Number(getId);
  })();

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

  //ajout du menu déroulant : trier par

  function addMenuSortBy() {
    (function () {
      worksFilter.innerHTML += `<label for="list-filter">Trier par</label>
  <select name="filter" id="list-filter">
      <option class="by-popular" value="Popularité">Popularité</option>
      <option class="sort_by_date" value="Date">Date</option>
      <option class="sort_by_title"  value="Titre">Titre</option>
      </select>`;
    })();
  }
  addMenuSortBy();

  function filter() {
    //fonction de trie par Dates
    function sortByDate() {
      let arrayDate = [];
      //fonction pour récuperer toutes les dates des médias correspondant à l id du photographe, et on les ajoute dans un tableau
      (function () {
        photographersMedia.forEach((valueDate) => {
          if (valueDate.photographerId === newGetId) {
            //arrayDate.push(valueDate.date)
            arrayDate.push(valueDate);
          }
        });
      })();

      //fonction pour organiser les médias du photographes en fonction des dates (de la plus récente à la plus ancienne)
      function toOrderMediaByDate() {
        const date = (e) => e.date;
        let orderByDate = [];
        console.log(orderByDate);
        orderByDate = arrayDate.sort(date).reverse();

        orderByDate.forEach((element) => {
          //on affiche toutes les images liées à l'Id du photographe

          if (element.photographerId === newGetId && element.image) {
              addImage(element,lastName)
          }

          //on affiche toutes les vidéos liées à l Id du photographe
          if (element.photographerId === newGetId && element.video) {
              addVideo(element,lastName);
          }
        });
      }
      toOrderMediaByDate();
    }

    //fonction de trie des likes dans le fichier JSON
    const sortByLikes = () => {
      //fonction pour récuperer toutes les likes des médias correspondant à l id du photographe, et on les ajoute dans un tableau
      let arrayLikes = [];
      (function () {
        photographersMedia.forEach((nbLikes) => {
          if (nbLikes.photographerId === newGetId) {
            arrayLikes.push(nbLikes);
          }
        });
      })();

      //fonction pour organiser les médias du photographes en fonction des likes (ordre décroissant)
      function orderMediaByPop() {
        //fonction pour ranger les likes dans l'ordre décroissant
        const byLikes = (a, b) => {
          return b.likes - a.likes;
        };
        let orderByLikes = arrayLikes.sort(byLikes);

        orderByLikes.forEach((element) => {
          //on affiche toutes les images liées à l'Id du photographe
          if (element.photographerId === newGetId && element.image) {
            addImage(element,lastName)
          }
          //on affiche toutes les vidéos liées à l Id du photographe
          if (element.photographerId === newGetId && element.video) {
            addVideo(element,lastName)
          }
        });
      }
      orderMediaByPop();
    };

    //fonction de trie des titres dans le fichier JSON
    const sortByABC = () => {
      let arrayMediaTitle = [];
      //fonction pour récuperer tous les titres des médias correspondant à l id du photographe, et on les ajoute dans un tableau
      photographersMedia.forEach((titleMedia) => {
        if (titleMedia.photographerId === newGetId) {
          arrayMediaTitle.push(titleMedia);
        }
      });

      //fonction pour organiser les médias du photographes en fonction des titres (ordre alphabétique)
      function toOrderMediaByABC() {
        let orderByTitle = arrayMediaTitle.sort(function compare(a, b) {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });

        orderByTitle.forEach((element) => {
          if (element.photographerId === newGetId && element.image) {
            //on affiche toutes les images liées à l'Id du photographe
            addImage(element,lastName);
          }
          //on affiche toutes les vidéos liées à l Id du photographe
          if (element.photographerId === newGetId && element.video) {
            addVideo(element,lastName);
          }
        });
      }
      toOrderMediaByABC();
    };

    const buttonSelect = document.querySelector("select");

    //on applique un evenement au click sur le bouton select pour pouvoir afficher le contenu filtré
    buttonSelect.addEventListener("click", function () {
      if (buttonSelect.value === "Popularité") {
        works.innerHTML = "";
        sortByLikes();
        Lightbox.init();
    
      } else if (buttonSelect.value === "Titre") {
        //affichage de la gallerie triée par ordre alphabétique au clic du lien : Titre
        works.innerHTML = "";
        sortByABC();
        Lightbox.init();
      
      } else if ((buttonSelect.value = "Date")) {
        //affichage de la gallerie triée  par date au clic du lien : Date
        works.innerHTML = "";
        sortByDate();
        Lightbox.init();
        
      }
    });
  }

  filter();
};
