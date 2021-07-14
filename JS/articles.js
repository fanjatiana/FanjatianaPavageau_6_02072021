/********************************* DOM ****************************************/
const article = document.querySelector('article');
const container = document.getElementById('container');


/**********************************************Requête pour l'affichage de la liste de photographes********************************************************/

/*chargement du fichier Json avec l'URL*/
/*fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    .then(response => response.json())
    .then(pictures => console.log(pictures))*/



/*chargement du fichier Json en locale*/
const getPictures = async () => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;


    /* on cré une variable pour réccupérer la liste des photographes du json*/
    let photographersList = data.photographers;

    /*boucle for pour ajouter les articles des photographes*/
    for (let element of photographersList) {

        /*on cré un bloc de code dans le html qui affichera les photos et infos des photographes*/
        container.innerHTML +=
            `<article>
           <section class="id-photograph">
               <a href="#">
                   <img src="/Photos/gallery/Photographers-Photos/${element.portrait}">
                   <h2>${element.name}</h2>
               </a>
           </section>
           <section class="infos-photograph">
               <p>${element.country}, ${element.city}</p>
               <p>${element.tagline}</p>
               <p>${element.price}€/jour</p>
           </section>
           <section class="tag-links">
               <ul id="tagList${element.tags}"></ul>
           </section>
       </article>`;

        /*on effectue une boucle forEach pour ajouter les liens des tags associés aux photographes*/
        let tagList = document.getElementById("tagList" + element.tags);
        [...element.tags].forEach(photographersTags => {
            tagList.innerHTML +=
                ` <li class = "tags" "><a class = "links" href="#">#${photographersTags}</a></li>`
        })
    }
}

getPictures();


/****************************************** Requête pour la partie navigation**********************************************************************************/

const getTags = async () => {
    let responseTags = await fetch("./JS/data.json");
    let tagsLinks = await responseTags.json();
    let err2 = function (err2) {
        // Une erreur est survenue
        alert(err2);
    };
    err2;


    /*création d'une variable contenant la liste des photographes*/
    let listOfPhotographers = tagsLinks.photographers;


    /*on recherche dans le DOM la balise NAV contenant la classe nav-tag-links pour pouvoir plus tard y afficher la liste des liens de navigation*/
    const nav = document.querySelector('.nav-tag-links');

    /*on cré un  tableau vide et on utilise des boucles pour rechercher et recupérer toute la liste des tags qu'on va ajouter dans ce tableau*/
    let tagsArray = [];
    for (let tags of listOfPhotographers) {

        let arrayList = tags.tags;
        for (let tagName of arrayList) {
            tagsArray.push(tagName);
        }
    };

    /*on supprimer les tags doublons du tableau*/
    let uniqueSet = new Set(tagsArray);
    let backToArrayTags = [...uniqueSet];


    /*on affiche le nouveau tableau des tags en tant que liens de navigation dans le html. Pour celà on cré une boucle for*/

    const navUl = document.querySelector(".links-list");

    for (let elements of backToArrayTags) {
        let tagsTheme = elements;

        navUl.innerHTML += `
        
                <li><a class = "links" href=""># ${tagsTheme}</a></li>    `
    }
}
getTags();


/***********************************************************Requête Filtre ******************************************************************************/

const getFilter = async () => {
    let responsefiltre = await fetch("./JS/data.json")
    let dataLinks = await responsefiltre.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;

    /*on cré et initialise une variable pour le nombre de liens tag des photographes*/

    let photographersListForFilter = dataLinks.photographers;
    container.innerHTML = "";
    photographersListForFilter.filter(function (element) {

        if (element.tags.includes('events')) {

            let photographTags = element.tags;

            container.innerHTML +=
                `<article>
               <section class="id-photograph">
                   <a href="#">
                       <img src="/Photos/gallery/Photographers-Photos/${element.portrait}">
                       <h2>${element.name}</h2>
                   </a>
               </section>
               <section class="infos-photograph">
                   <p>${element.country}, ${element.city} </p>
                   <p>${element.tagline}</p>
                   <p>${element.price}€/jour</p>
               </section>
               <section class="tag-links">
                   <ul id="tagListOfFilter${element.id}"></ul>
               </section>
           </article>`

            let tagList = document.getElementById("tagListOfFilter" + element.id);
            photographTags.forEach(tagShow => {

                tagList.innerHTML +=
                    ` <li class = "tags" "><a class = "links" href="#">#${tagShow}</a></li>`
            }

        )}
    })   
}

getFilter();
