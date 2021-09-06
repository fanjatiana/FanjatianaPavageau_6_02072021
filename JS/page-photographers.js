/* eslint-disable import/extensions */
import { getInfoPhotographer } from './page-photographers/getInfoPhotographer.js';
import { getPhotographersWorks } from './page-photographers/getPhotographerWorks.js';
import { getNavFilter } from './page-photographers/getNavFilter.js';
import { getInfoModale } from './page-photographers/getInfomodale.js';

// Requête pour afficher les informations des photographes
getInfoPhotographer();

// Requête pour le fonctionnement du formulaire
getInfoModale();

// Reqête pour afficher la gallerie des photographes + lightBox
getPhotographersWorks();

// Requête pour le fonctionnement du filtre : trier par; et pour l'affichage de la gallerie filtrée
getNavFilter();
