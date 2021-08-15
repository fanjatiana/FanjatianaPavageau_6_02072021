import {addPhotographersList, addPhotographersTags,showPhotographersListFiltred } from "./functions_index.js";

/**********************************************Requête pour l'affichage de la liste de photographes********************************************************/

/*chargement du fichier Json avec l'URL*/
/*fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    .then(response => response.json())
    .then(pictures => console.log(pictures))*/

/************************************************************************************************************************************************************/



/*chargement du fichier Json en locale*/
const getHomePage= async (data) => {
    let response = await fetch("./JS/data.json")
    data = await response.json()
    .catch(function error (err) {
        // Une erreur est survenue
        alert(err);
    });

    addPhotographersList();
    addPhotographersTags();
    showPhotographersListFiltred();
  
    
}

getHomePage();



