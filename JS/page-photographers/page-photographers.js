// import des constantes de DOM-constantes
import { addInfoOfPhotographer, showModal,controlForm, } from "./functions_showInfoPhotographer_page2.js";
import { Lightbox } from "./LightBox/lightbox.js";
import { addCounterLiker, addImages,addVideo, incrementMediaLikes} from "./functions_photographersWorks_page2.js";
import { addMenuSortBy, showMediaByDate, showMediaByLikes, showMediaByABC} from "./functions_navFilter_page2.js";




/***********************************************************************************************************************/
                    /*REQUETE POUR AFFICHER LES INFOS + FORMULAIRE DE CONTACT DU PHOTOGRAPHE/

/***********************************************************************************************************************/

const showInfoPhotographer = async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json();

    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;

//ajout des informations sur le photographe
addInfoOfPhotographer();
//mise en service du formulaire de contact
showModal();
//fonction de controle du formulaire    
controlForm();

}
showInfoPhotographer();


/***********************************************************************************************************************/
                    /*REQUETE POUR AFFICHER LA GALLERIE DES MEDIAS ET LA LIGHTBOX DU PHOTOGRAPHE/

/***********************************************************************************************************************/


const showPhotographersWorks = async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;

//fonction pour afficher les images dans la gallerie
addImages();

//fonction pour afficher la(les) video(s) dans la gallerie
addVideo();

//fonction pour afficher le compteur de like    
addCounterLiker();

//fonction pour afficher l'incrémentation des likes au clic des coeurs
incrementMediaLikes();

//fonction pour afficher la lightBox
Lightbox.init();

}
showPhotographersWorks();

/***********************************************************************************************************************/
                    /*REQUETE POUR AFFICHER LE MENU DEROULANT ET LES MEDIAS FILTRES DU PHOTOGRAPHE*/

/***********************************************************************************************************************/

const navFilter = async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;

//ajout du menu déroulant : trier par
  addMenuSortBy();

//fonction : trier par popularité
showMediaByLikes();
//fonction : trier par date
showMediaByDate();
//fonction : trier par Titre
showMediaByABC();

}
navFilter();
















