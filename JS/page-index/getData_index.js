import {addPhotographersList, addPhotographersTags,showPhotographersListFiltered } from "./functions_index.js";

/**********************************************Requête pour l'affichage de la liste de photographes********************************************************/

/*chargement du fichier Json avec l'URL*/
/*fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    .then(response => response.json())
    .then(pictures => console.log(pictures))*/

/************************************************************************************************************************************************************/






/***********************************************************************************************************************/
                    /*REQUETE POUR AFFICHER LE CONTENU DE LA PAGE D'ACCUEIL : LISTE DES PHOTOGRAPHES*/

/***********************************************************************************************************************/

const getPhotographersList= async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json()
    .catch(function error (err) {
        // Une erreur est survenue
        alert(err);
    });

    addPhotographersList();   
}
getPhotographersList();


/***********************************************************************************************************************/
                    /*REQUETE POUR AFFICHER LES TAGS DE CHAQUE PHOTOGRAPHE*/

/***********************************************************************************************************************/

const getPhotographersTags= async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json()
    .catch(function error (err) {
        // Une erreur est survenue
        alert(err);
    });

    addPhotographersTags();  
}
getPhotographersTags();


/***********************************************************************************************************************/
                    /*REQUETE POUR LA MISE EN PLACE DU FILTRE DE NAVIGATION 
                    ET POUR L'AFFICHAGE DE LA LISTE DES PHOTOGRAPHES FILTRES*/

/***********************************************************************************************************************/

const getMenuFilter= async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json()
    .catch(function error (err) {
        // Une erreur est survenue
        alert(err);
    });
    showPhotographersListFiltered();   
}
getMenuFilter();

