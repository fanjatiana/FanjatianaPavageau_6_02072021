// import des constantes de DOM-constantes
import { addInfoOfPhotographer, showModal,controlForm, } from "./functions_showInfoPhotographer_page2.js";
import { Lightbox } from "./LightBox/lightbox.js";
import { addCounterLiker, addImages,addVideo} from "./functions_photographersWorks_page2.js";
import { addMenuSortBy, showMediaByDate, showMediaByLikes, showMediaByABC} from "./functions_navFilter_page2.js";




/***********************************************************************************************************************/
                    /*REQUETE POUR AFFICHER LES INFOS + FORMULAIRE DE CONTACT DU PHOTOGRAPHE/

/***********************************************************************************************************************/

const getInfoPhotographer = async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json()
    .catch(function error (err) {
        // Une erreur est survenue
        alert(err);
    });

//ajout des informations sur le photographe
addInfoOfPhotographer();
//mise en service du formulaire de contact
showModal();
//fonction de controle du formulaire    
controlForm();

}
getInfoPhotographer();


/***********************************************************************************************************************/
                    /*REQUETE POUR AFFICHER LA GALLERIE DES MEDIAS ET LA LIGHTBOX DU PHOTOGRAPHE/

/***********************************************************************************************************************/


const getPhotographersWorks = async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json()
    .catch(function error (err) {
        // Une erreur est survenue
        alert(err);
    });

//fonction pour afficher les images dans la gallerie
addImages();

//fonction pour afficher la(les) video(s) dans la gallerie
addVideo();

//fonction pour afficher le compteur de like    
addCounterLiker();

//fonction pour afficher l'incrémentation des likes au clic des coeurs
//incrementMediaLikes();

//fonction pour afficher la lightBox
Lightbox.init();

}
getPhotographersWorks();

/***********************************************************************************************************************/
                    /*REQUETE POUR AFFICHER LE MENU DEROULANT ET LES MEDIAS FILTRES DU PHOTOGRAPHE*/

/***********************************************************************************************************************/

const getNavFilter = async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json()
    .catch(function error (err) {
        // Une erreur est survenue
        alert(err);
    });

//ajout du menu déroulant : trier par
  addMenuSortBy();

//fonction : trier par popularité
showMediaByLikes();
//fonction : trier par date
showMediaByDate();
//fonction : trier par Titre
showMediaByABC();

}
getNavFilter();




/*const getShowSelectionPage2= async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json()
    .catch(function error (err) {
        // Une erreur est survenue
        alert(err);
    });  
   
    showTagsSelected();
   
}
getShowSelectionPage2();*/












