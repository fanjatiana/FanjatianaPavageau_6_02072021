/* eslint-disable import/extensions */
import { getPhotographersList } from './getPhotographerList.js';
import { getPhotographersTags } from './getPhotographersTags.js';
import { getMenuFilter } from './getMenuFilter.js';

// Requête pour afficher la liste des photographes au chargement de la page
getPhotographersList();

// Reqête pour afficher les tags de chaque photographes
getPhotographersTags();

// Requête pour filtrer la liste des photographes au clic des tags
getMenuFilter();
