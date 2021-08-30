import { photographersMedia, worksFilter, works } from "./let-and-const_page-photographers.js";
import { newGetId } from "./functions_showInfoPhotographer_page2.js";
import { addCounterLiker, lastName } from "./functions_photographersWorks_page2.js";
import { Lightbox } from "./LightBox/lightbox.js";




//function pour ajouter  le bloc de filtre :  trier par
export function addMenuSortBy() {
    (function () {
        worksFilter.innerHTML += `<label for="list-filter">Trier par</label>
    <select name="filter" id="list-filter">
        <option class="by-popular" value="Popularité">Popularité</option>
        <option class="sort_by_date" value="Date">Date</option>
        <option class="sort_by_title"  value="Titre">Titre</option>
        </select>`
    })();
}

    export function filter() {

        //fonction de trie par Dates
        function sortByDate() {
            let arrayDate = [];
            //fonction pour récuperer toutes les dates des médias correspondant à l id du photographe, et on les ajoute dans un tableau
            (function () {
                photographersMedia.forEach(valueDate => {
                    if (valueDate.photographerId === newGetId) {
                        //arrayDate.push(valueDate.date)
                        arrayDate.push(valueDate)
                    }
                });
            })();


            //fonction pour organiser les médias du photographes en fonction des dates (de la plus récente à la plus ancienne)
            function toOrderMediaByDate() {
                const date = e => e.date;
                let orderByDate = [];
                console.log(orderByDate)
                orderByDate = arrayDate.sort(date).reverse();

                orderByDate.forEach(objet => {
                    //on affiche toutes les images liées à l'Id du photographe
                    if (objet.photographerId === newGetId && objet.image) {
                        works.innerHTML +=
                            `<article id ="${objet.photographerId}">
                        <div class = "gallery">
                            <a href="./Photos/gallery/${lastName}/${objet.image}" title="${objet.title}">
                                <img class="pictures-list" src = "./Photos/gallery/${lastName}/${objet.image}" alt ="${objet.description}">
                            </a>    
                        </div>
                        <div class="info_media">
                            <h4>${objet.title}</h4>
                            <div class ="like">
                                <p class= "nb-likes">${objet.likes}</p>
                                <button class ="likes_media" type="button" aria-label="button-like">
                                    <i class="fas fa-heart "></i>
                                </button>
                            </div>    
                        </div>
                 </article>`
                    }
                    //on affiche toutes les vidéos liées à l Id du photographe
                    if (objet.photographerId === newGetId && objet.video) {
                        works.innerHTML +=
                            `<article id ="${objet.photographerId}">
                <div class = "gallery">
                    <a href="./Photos/gallery/${lastName}/${objet.video}" title="${objet.title}">
                        <video alt="${objet.description}">
                            <source src="./Photos/gallery/${lastName}/${objet.video}" type="video/mp4">
                        </video>
                    </a>    
                </div>
                <div class="info_media">
                    <h4>${objet.title}</h4>
                    <div class ="like">
                        <p class="nb-likes">${objet.likes}</p>
                        <button class ="likes_media" type="button" aria-label="button-like">
                            <i class="fas fa-heart "></i>
                        </button>
                    </div>
                </div>   
            </article>`
                    }
                });
            }
            toOrderMediaByDate();
        }


        //fonction de trie des likes dans le fichier JSON
        const sortByLikes = () => {
            //fonction pour récuperer toutes les likes des médias correspondant à l id du photographe, et on les ajoute dans un tableau
            let arrayLikes = [];
            (function () {
                photographersMedia.forEach(nbLikes => {
                    if (nbLikes.photographerId === newGetId) {
                        arrayLikes.push(nbLikes);
                    }
                });
            })();

            //fonction pour organiser les médias du photographes en fonction des likes (ordre décroissant)
            function orderMediaByPop() {

                //fonction pour ranger les likes dans l'ordre décroissant
                const byLikes = (a, b) => {
                    return b.likes - a.likes
                }
                let orderByLikes = arrayLikes.sort(byLikes);

                orderByLikes.forEach(valueLikes => {
                    //on affiche toutes les images liées à l'Id du photographe
                    if (valueLikes.photographerId === newGetId && valueLikes.image) {
                        works.innerHTML +=
                            `<article id ="${valueLikes.photographerId}">
                    <div class = "gallery">
                        <a href="./Photos/gallery/${lastName}/${valueLikes.image}" value="${valueLikes.title}">
                            <img class="pictures-list" src = "./Photos/gallery/${lastName}/${valueLikes.image}" alt ="${valueLikes.description}">
                        </a>
                    </div>
                    <div class="info_media">
                        <h4>${valueLikes.title}</h4>
                        <div class ="like">
                            <p class= "nb-likes">${valueLikes.likes}</p>
                            <button class ="likes_media" type="button" aria-label="button-like">
                                <i class="fas fa-heart "></i>
                            </button>
                        </div>    
                    </div>
             </article>`
                    }
                    //on affiche toutes les vidéos liées à l Id du photographe
                    if (valueLikes.photographerId === newGetId && valueLikes.video) {
                        works.innerHTML +=
                            `<article id ="${valueLikes.photographerId}">
            <div class = "gallery">
                <a href="./Photos/gallery/${lastName}/${valueLikes.video}" value="${valueLikes.title}">
                    <video alt="${valueLikes.description}">>
                        <source src="./Photos/gallery/${lastName}/${valueLikes.video}" type="video/mp4">
                    </video>
                </a>
            </div>
            <div class="info_media">
                <h4>${valueLikes.title}</h4>
                <div class ="like">
                    <p class="nb-likes">${valueLikes.likes}</p>
                    <button class ="likes_media" type="button" aria-label="button-like">
                        <i class="fas fa-heart "></i>
                    </button>
                </div>    
            </div>   
        </article>`
                    }
                });
            }
            orderMediaByPop();
        }


        //fonction de trie des titres dans le fichier JSON
        const sortByABC = () => {
            let arrayMediaTitle = [];
            //fonction pour récuperer tous les titres des médias correspondant à l id du photographe, et on les ajoute dans un tableau
            photographersMedia.forEach(titleMedia => {
                if (titleMedia.photographerId === newGetId) {
                    arrayMediaTitle.push(titleMedia)
                }
            });

            //fonction pour organiser les médias du photographes en fonction des titres (ordre alphabétique)
            function toOrderMediaByABC() {
                let orderByTitle = arrayMediaTitle.sort(function compare(a, b) {
                    if (a.title < b.title)
                        return -1;
                    if (a.title > b.title)
                        return 1;
                    return 0;
                });

                orderByTitle.forEach(infoTitle => {
                    if (infoTitle.photographerId === newGetId && infoTitle.image) {
                        //on affiche toutes les images liées à l'Id du photographe
                        works.innerHTML +=
                            `<article id ="${infoTitle.photographerId}">
                        <div class = "gallery">
                            <a href="./Photos/gallery/${lastName}/${infoTitle.image}" title="${infoTitle.title}">
                                <img class="pictures-list" src = "./Photos/gallery/${lastName}/${infoTitle.image}"alt ="${infoTitle.description}">
                            </a>
                                </div>
                        <div class="info_media">
                            <h4>${infoTitle.title}</h4>
                            <div class ="like">
                                <p class= "nb-likes">${infoTitle.likes}</p>
                                <button class ="likes_media" type="button" aria-label="button-like">
                                    <i class="fas fa-heart "></i>
                                </button>
                            </div>
                        </div>
                 </article>`
                    }
                    //on affiche toutes les vidéos liées à l Id du photographe
                    if (infoTitle.photographerId === newGetId && infoTitle.video) {
                        works.innerHTML +=
                            `<article id ="${infoTitle.photographerId}">
                <div class = "gallery">
                    <a href="./Photos/gallery/${lastName}/${infoTitle.video}" title="${infoTitle.title}">
                        <video alt="${infoTitle.description}">
                            <source src="./Photos/gallery/${lastName}/${infoTitle.video}" type="video/mp4">
                        </video>
                    </a>    
                </div>
                <div class="info_media">
                    <h4>${infoTitle.title}</h4>
                    <div class ="like">
                        <p class="nb-likes">${infoTitle.likes}</p>
                        <button class ="likes_media" type="button" aria-label="button-like">
                            <i class="fas fa-heart "></i>
                        </button>
                    </div>
                </div>   
            </article>`
                    }
                });
            }
            toOrderMediaByABC();
        }



        const buttonSelect = document.querySelector("select");

        //on applique un evenement au click sur le bouton select pour pouvoir afficher le contenu filtré
        buttonSelect.addEventListener("click", function () {
            if (buttonSelect.value === "Popularité") {
                works.innerHTML = "";
                sortByLikes();
                addCounterLiker();
                Lightbox.init();

            } else if (buttonSelect.value === "Titre") {
                //affichage de la gallerie triée par ordre alphabétique au clic du lien : Titre
                works.innerHTML = "";
                sortByABC();
                addCounterLiker();
                Lightbox.init();

            } else if (buttonSelect.value = "Date") {
                //affichage de la gallerie triée  par date au clic du lien : Date
                works.innerHTML = "";
                sortByDate();
                addCounterLiker();
                Lightbox.init();

            }

        })

    

}




