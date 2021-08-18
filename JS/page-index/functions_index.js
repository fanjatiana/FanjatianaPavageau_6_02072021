import { photographersList,container } from "./let-and-const_index.js";

//fonction pour ajouter la liste des photographes
export function addPhotographersList() {

    /*boucle for pour ajouter les articles des photographes*/
    photographersList.forEach(element => {
        /*on cré un bloc de code dans le html qui affichera les photos et infos des photographes*/
        container.innerHTML +=
            `<article id="${element.id}">
           <section class="photograph">
               <a id ="go-to-photograph-page" href="page-photographers.html?id-${element.id}">
                   <img src="/Photos/gallery/Photographers-Photos/${element.portrait}" alt="${element.description}">
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
    });
}

//fonction pour ajouter les tags de chaques photographes
export function addPhotographersTags() {
    /*on cré un  tableau vide et on utilise des boucles pour rechercher et recupérer toute la liste des tags qu'on va ajouter dans ce tableau*/
    let tagsArray = [];
    photographersList.forEach(tags => {
        let arrayList = tags.tags;
        for (let tagName of arrayList) {
            tagsArray.push(tagName);
        }
    });
    /*on supprime les tags doublons du tableau*/
    let uniqueSet = new Set(tagsArray);
    let backToArrayTags = [...uniqueSet];

    /*on affiche le nouveau tableau des tags et on les ajoute en tant que liens dans la partie navigation (nav) du html. Pour celà on cré une boucle for*/
    const baliseUL = document.querySelector(".links-list");

    backToArrayTags.forEach(element => {
        let tagsTheme = element;
        baliseUL.innerHTML += `<li><a class = "links links-filter" href="">#${tagsTheme}</a></li>`
    });

}

//fonction pour filtrer et afficher la liste des photographes filtrée
export function showPhotographersListFiltered() {
/*on vient appliquer un addEventListener sur les liens de la navigation et on les relie à la fonction filtre, pour afficher les éléments filtrés*/
const listLinksA = document.querySelectorAll('.links-filter');
        (function(){
            listLinksA.forEach(navLinks => {
                let filter = navLinks.innerHTML.replace("#", "");
                navLinks.addEventListener('click', event => {
                    addNavFilter(filter)
                    event.preventDefault();
                })
            });
        })();     

        //fonction affichage des photographes filtrés
    function addNavFilter(filter) {
        /* on vide la div container des articles*/
        container.innerHTML = "";

        /*boucle forEach pour appliquer la fonction filtre sur les tags de chaque photographes puis on ajoute la liste des photographes filtrées dans le html*/
        photographersList.forEach(photograph => {

            if (photograph.tags.includes(filter)) {
                /*on cré un bloc de code dans le html qui affichera les photos et infos des photographes*/
                container.innerHTML +=
                    `<article id="${photograph.id}">
            <section class="photograph">
                <a id ="photographersFiltered-to-photograph-page" href="page-photographers.html?id-${photograph.id}">
                    <img src="/Photos/gallery/Photographers-Photos/${photograph.portrait}" alt="${photograph.description}">
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

}

export function backToMain (){
const  body = document.querySelector("body");
console.log(body)

    //ajout de la div : aller au contenu
    body.innerHTML += 
    `<div id ="go-to-content">
        <a class="link_go-to-content" href = "#gallery-photographers" title = "cliquez pour passer au contenu">
            <h4>Passer au contenu</h4>
        </a>
    </div>`

    function showLinksGoToMain (){
        const divGoToContent = document.getElementById("go-to-content");
        const linkGotToContent = document.querySelector(".link_go-to-content");
        console.log(linkGotToContent);
        
        console.log(divGoToContent)

        body.onscroll = function() {
            divGoToContent.style.display = "block";
          };
    }

    showLinksGoToMain();
}