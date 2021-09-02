import { getPhotographersList } from "./getPhotographerList.js";
import { getPhotographersTags } from "./getPhotographersTags.js";
import { getMenuFilter } from "./getMenuFilter.js";

//REQUETE POUR AFFICHER LE CONTENU DE LA PAGE D'ACCUEIL : LISTE DES PHOTOGRAPHES
getPhotographersList();

//REQUETE POUR AFFICHER LES TAGS DE CHAQUE PHOTOGRAPHE
getPhotographersTags();

//REQUETE POUR LA MISE EN PLACE DU FILTRE DE NAVIGATION ET POUR L'AFFICHAGE DE LA LISTE DES PHOTOGRAPHES FILTRES*/
getMenuFilter();
