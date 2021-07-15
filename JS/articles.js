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
        let listOfTags = document.getElementById("tagList" + element.tags);
        element.tags.forEach(photographersTags => {
            listOfTags.innerHTML +=
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

    /*on cré un  tableau vide et on utilise des boucles pour rechercher et recupérer toute la liste des tags qu'on va ajouter dans ce tableau*/
    let tagsArray = [];
    for (let tags of listOfPhotographers) {
        let arrayList = tags.tags;
        for (let tagName of arrayList) {
            tagsArray.push(tagName);
        }
    };

    /*on supprime les tags doublons du tableau*/
    let uniqueSet = new Set(tagsArray);
    let backToArrayTags = [...uniqueSet];

    /*on affiche le nouveau tableau des tags et on les ajoute en tant que liens dans la partie navigation (nav) du html. Pour celà on cré une boucle for*/
    const baliseUL = document.querySelector(".links-list");

    for (let el of backToArrayTags) {
        let tagsTheme = el;
        baliseUL.innerHTML += `<li><a class = "links links-filter" href="">#${tagsTheme}</a></li>`
    }

    /*on vient appliquer un addEventListener sur les liens de la navigation et on les relie à la fonction filtre, pour afficher les éléments filtrés*/
    const listLinksA = document.querySelectorAll('.links-filter');

    for (let navLinks of listLinksA) {
        let filter = navLinks.innerHTML.replace("#", "");
        navLinks.addEventListener('click', e => {
            getFilter(filter)
            e.preventDefault();
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
    }; err;

    /* on vide la div container des articles*/
    container.innerHTML = "";

    
    /*boucle forEach pour appliquer la fonction filtre sur les tags de chaque photographes puis on ajoute la liste des photographes filtrées dans le html*/
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
            let listOfTags = document.getElementById("tagList" + photograph.id);
            photograph.tags.forEach(photographersTags => {
                listOfTags.innerHTML +=
                    ` <li class = "tags" "><a class = "links" href="#">#${photographersTags}</a></li>`
            })
        }
    })
}

//getFilter();

