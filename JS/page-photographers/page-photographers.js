import { getInfoPhotographer } from "./getInfoPhotographer.js";
import { getPhotographersWorks } from "./getPhotographerWorks.js";
import { getNavFilter } from "./getNavFilter.js";

/***********************************************************************************************************************/
/*REQUETE POUR AFFICHER LES INFOS + FORMULAIRE DE CONTACT DU PHOTOGRAPHE/

/***********************************************************************************************************************/

getInfoPhotographer();

/***********************************************************************************************************************/
/*REQUETE POUR AFFICHER LA GALLERIE DES MEDIAS ET LA LIGHTBOX DU PHOTOGRAPHE/

/***********************************************************************************************************************/

getPhotographersWorks();

/***********************************************************************************************************************/
/*REQUETE POUR AFFICHER LE MENU DEROULANT ET LES MEDIAS FILTRES DU PHOTOGRAPHE*/

/***********************************************************************************************************************/

getNavFilter();