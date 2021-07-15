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
            `<article id="${element.id}">
           <section class="photograph">
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
        element.tags.forEach(photographersTags => {
            tagList.innerHTML +=
                ` <li class = "tags" "><a class = "links" href="#">#${photographersTags}</a></li>`
        })
    }
}

getPictures();


/****************************************** Requête pour la partie navigation**********************************************************************************/

const getTags = async () => {
    let response = await fetch("./JS/data.json");
    let data = await response.json();
    let err2 = function (err2) {
        // Une erreur est survenue
        alert(err2);
    };
    err2;

    /*création d'une variable contenant la liste des photographes*/
    let listOfPhotographers = data.photographers;

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

    /*on affiche le nouveau tableau des tags en tant que liens de navigation, dans le html. Pour celà on cré une boucle for*/
    const navUl = document.querySelector(".links-list");

    for (let elements of backToArrayTags) {
        let tagsTheme = elements;
        navUl.innerHTML += `<li><a class = "links links-filter" href=""># ${tagsTheme}</a></li>`
    }

    /*on vient appliquer un addEventListener sur les liens de la navigation et on les relie à la fonction filtre, pour afficher les éléments filtrés*/
    const listLinksA = document.querySelectorAll('.links-filter');
        for (let navLinks of listLinksA){
            navLinks.addEventListener('click', e =>{
                e.preventDefault();
                getFilter("events");
            })
        }
        




}
getTags();


/***********************************************************Requête Filtre ******************************************************************************/
const getFilter = async (filter) => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;


    /* on cré une variable pour réccupérer la liste des photographes du json*/

    container.innerHTML = "";
    /*boucle for pour ajouter les articles des photographes*/
    data.photographers.forEach(photograph => {

        if (photograph.tags.includes(filter)) {
            /*on cré un bloc de code dans le html qui affichera les photos et infos des photographes*/
            container.innerHTML +=
                `<article id="${photograph.id}">
           <section class="photograph">
               <a href="#">
                   <img src="/Photos/gallery/Photographers-Photos/${photograph.portrait}">
                   <h2>${photograph.name}</h2>
               </a>
           </section>
           <section class="infos-photograph">
               <p>${photograph.country}, ${photograph.city}</p>
               <p>${photograph.tagline}</p>
               <p>${photograph.price}€/jour</p>
           </section>
           <section class="tag-links">
               <ul id="tagList${photograph.id}"></ul>
           </section>
       </article>`;

            /*on effectue une boucle forEach pour ajouter les liens des tags associés aux photographes*/
            let tagList = document.getElementById("tagList" + photograph.id);
            photograph.tags.forEach(photographersTags => {
                tagList.innerHTML +=
                    ` <li class = "tags" "><a class = "links" href="#">#${photographersTags}</a></li>`
            })
        }
    })    
}

//getFilter();

