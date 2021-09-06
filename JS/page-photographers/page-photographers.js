/* eslint-disable import/extensions */
import { getInfoPhotographer } from './getInfoPhotographer.js';
import { getPhotographersWorks } from './getPhotographerWorks.js';
import { getNavFilter } from './getNavFilter.js';
import { getInfoModale } from './getInfomodale.js';

// Requête pour afficher les informations des photographes
getInfoPhotographer();

// Requête pour le fonctionnement du formulaire
getInfoModale();

// Reqête pour afficher la gallerie des photographes + lightBox
getPhotographersWorks();

// Requête pour le fonctionnement du filtre : trier par; et pour l'affichage de la gallerie filtrée
getNavFilter();
