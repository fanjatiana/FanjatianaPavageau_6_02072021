import { photographersMedia, worksFilter, works } from "./let-and-const_page-photographers.js";
import { newGetId } from "./functions_showInfoPhotographer_page2.js";
import { lastName } from "./functions_photographersWorks_page2.js";
import { Lightbox } from "./LightBox/lightbox.js";

//function ajout du bloc de filtre :  trier par
export function addMenuSortBy() {

    //ajout du contenu html
    (function () {
        worksFilter.innerHTML +=
            `<h2>Trier par</h2>
<div id="list-filter">
<div id="click-for-show" >
    <a href="" class = "by-popular">Popularité
        <i class="fas fa-chevron-down"></i>
        <i class="fas fa-chevron-up"></i>
    </a>
</div>
<div class="sous-menu" >
    <div><a class="sort_by_date menu-hidden"  href="">Date</a></div>
    <div><a class = "sort_by_title menu-hidden" href="">Titre</a></div>
<div>
</div>`
    })();


    const arrowDown = document.querySelector(".fa-chevron-down");
    const chevronUp = document.querySelector(".fa-chevron-up")
    const sousMenu = document.querySelector(".sous-menu");
    const divContentNav = document.getElementById("list-filter");

    //fonction affichage du menu déroulant au hover de la souris
    function showNav() {
        divContentNav.addEventListener("mouseover", function () {
            sousMenu.style.display = "block";
            arrowDown.style.display = "none";
            chevronUp.style.display = "block";
        })
    }
    showNav();

    //fonction de fermeture du menu déroulant lorsque la souris n'est plus dans le champs
    function leaveNav() {
        divContentNav.addEventListener("mouseleave", function () {
            sousMenu.style.display = "none";
            arrowDown.style.display = "block";
            chevronUp.style.display = "none";

        }, true)
    }
    leaveNav();
}

//fonction pour afficher les medias par date
export function showMediaByDate() {

    //fonction de trie des dates dans le fichier JSON
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
            orderByDate = arrayDate.sort(date).reverse();

            orderByDate.forEach(objet => {
                //on affiche toutes les images liées à l'Id du photographe
                if (objet.photographerId === newGetId && objet.image) {
                    works.innerHTML +=
                        `<article id ="${objet.photographerId}">
                        <div class = "gallery">
                            <a href="./Photos/gallery/${lastName}/${objet.image}">
                                <img class="pictures-list" src = "./Photos/gallery/${lastName}/${objet.image}" alt ="${objet.description}">
                            </a>    
                        </div>
                        <div class="info_media">
                            <h3>${objet.title}</h3>
                            <p class= "nb-likes">${objet.likes}</p>
                            <button class = "likes_media"><i class="fas fa-heart "></i></bouton>
                        </div>
                 </article>`
                }
                //on affiche toutes les vidéos liées à l Id du photographe
                if (objet.photographerId === newGetId && objet.video) {
                    works.innerHTML +=
                        `<article id ="${objet.photographerId}">
                <div class = "gallery">
                    <a href="./Photos/gallery/${lastName}/${objet.video}">
                        <video controls width="500">
                            <source src="./Photos/gallery/${lastName}/${objet.video}" type="video/mp4">
                        </video>
                    </a>    
                </div>
                <div class="info_media">
                    <h3>${objet.title}</h3>
                    <p class="nb-likes">${objet.likes}</p>
                    <button class ="likes_media"><i class="fas fa-heart"></i></bouton>
                </div>   
            </article>`
                }
            });
        }
        toOrderMediaByDate();
    }

    //affichage de la gallerie triée  par date au clic du lien : Date
    document.querySelector(".sort_by_date").addEventListener("click", function (event) {
        works.innerHTML = "";
        event.preventDefault();
        sortByDate();
        Lightbox.init();
    })
}

//fonction afficher les medias par likes
export function showMediaByLikes() {

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
                        <a href="./Photos/gallery/${lastName}/${valueLikes.image}">
                            <img class="pictures-list" src = "./Photos/gallery/${lastName}/${valueLikes.image}" alt ="${valueLikes.description}">
                        </a>
                    </div>
                    <div class="info_media">
                        <h3>${valueLikes.title}</h3>
                        <p class= "nb-likes">${valueLikes.likes}</p>
                        <button class = "likes_media"><i class="fas fa-heart "></i></bouton>
                    </div>
             </article>`
                }
                //on affiche toutes les vidéos liées à l Id du photographe
                if (valueLikes.photographerId === newGetId && valueLikes.video) {
                    works.innerHTML +=
                        `<article id ="${valueLikes.photographerId}">
            <div class = "gallery">
                <a href="./Photos/gallery/${lastName}/${valueLikes.video}">
                    <video controls width="500">
                        <source src="./Photos/gallery/${lastName}/${valueLikes.video}" type="video/mp4">
                    </video>
                </a>
            </div>
            <div class="info_media">
                <h3>${valueLikes.title}</h3>
                <p class="nb-likes">${valueLikes.likes}</p>
                <button class ="likes_media"><i class="fas fa-heart"></i></bouton>
            </div>   
        </article>`
                }
            });
        }
        orderMediaByPop();
    }

    //affichage de la gallerie triée par popularité au clic du lien : Popularité
    document.querySelector(".by-popular").addEventListener("click", function (event) {
        works.innerHTML = "";
        event.preventDefault();
        sortByLikes();
        Lightbox.init();
    })
}

//fonction afficher les medias par ordre alphabétique
export function showMediaByABC() {

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
                            <a href="./Photos/gallery/${lastName}/${infoTitle.image}">
                                <img class="pictures-list" src = "./Photos/gallery/${lastName}/${infoTitle.image}"alt ="${infoTitle.description}">
                            </a>
                                </div>
                        <div class="info_media">
                            <h3>${infoTitle.title}</h3>
                            <p class= "nb-likes">${infoTitle.likes}</p>
                            <button class = "likes_media"><i class="fas fa-heart "></i></bouton>
                        </div>
                 </article>`
                }
                //on affiche toutes les vidéos liées à l Id du photographe
                if (infoTitle.photographerId === newGetId && infoTitle.video) {
                    works.innerHTML +=
                        `<article id ="${infoTitle.photographerId}">
                <div class = "gallery">
                    <a href="./Photos/gallery/${lastName}/${infoTitle.video}">
                        <video controls width="500">
                            <source src="./Photos/gallery/${lastName}/${infoTitle.video}" type="video/mp4">
                        </video>
                    </a>    
                </div>
                <div class="info_media">
                    <h3>${infoTitle.title}</h3>
                    <p class="nb-likes">${infoTitle.likes}</p>
                    <button class ="likes_media"><i class="fas fa-heart"></i></bouton>
                </div>   
            </article>`
                }
            });
        }
        toOrderMediaByABC();
    }

    //affichage de la gallerie triée par ordre alphabétique au clic du lien : Titre
    document.querySelector(".sort_by_title").addEventListener("click", function (event) {
        works.innerHTML = "";
        event.preventDefault();
        sortByABC();
        Lightbox.init();

    })
}






