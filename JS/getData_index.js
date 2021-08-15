import {addPhotographersList, addPhotographersTags,showPhotographersListFiltered } from "./functions_index.js";

/**********************************************Requête pour l'affichage de la liste de photographes********************************************************/

/*chargement du fichier Json avec l'URL*/
/*fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    .then(response => response.json())
    .then(pictures => console.log(pictures))*/

/************************************************************************************************************************************************************/



/*requête pour le contenu de la page d'accueil : liste des photographes*/
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


/*requête pour l'affichage des tags de chaque photographes*/
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



/*requête pour le filtre de navigation et l'affichage de la liste des photographes filtrés*/
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

