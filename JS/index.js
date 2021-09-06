/* eslint-disable import/extensions */
import { getPhotographersList } from './page-index/getPhotographerList.js';
import { getPhotographersTags } from './page-index/getPhotographersTags.js';
import { getMenuFilter } from './page-index/getMenuFilter.js';

// Requête pour afficher la liste des photographes au chargement de la page
getPhotographersList();

// Reqête pour afficher les tags de chaque photographes
getPhotographersTags();

// Requête pour filtrer la liste des photographes au clic des tags
getMenuFilter();
