// import des constantes de DOM-constantes
import { works, worksFilter,getUrl_id } from "./let-and-const_page-photographers.js"
import { addInfoOfPhotographer, showModal,controlForm, } from "./functions_showInfoPhotographer_page2.js";
import { Lightbox } from "./LightBox/lightbox.js";
import {photographersList} from "../page-index/let-and-const_index.js";
import { addCounterLiker, addImages,addVideo, incrementMediaLikes } from "./functions_photographersWorks_page2.js";
import { newGetId } from "./functions_showInfoPhotographer_page2.js";


//requête pour afficher les infos du photographes et du formulaire de contact
const showInfoPhotographer = async (data, response) => {
    response = await fetch("./JS/data.json")
    data = await response.json();

    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;

//ajout des infos du photographes
addInfoOfPhotographer();
//mise en service de la modale
showModal();
//controle du formulaire    
controlForm();

}
showInfoPhotographer();




//une requête pour afficher la gallerie du photographe

const photographersWorks = async () => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;

//fonction pour afficher les images dans la gallerie
addImages();

//fonction pour afficher la(les) video(s) dans la gallerie
addVideo();
    /************************************************************************************ajout des articles******************************************************** */
//fonction pour afficher le compteur de like    
addCounterLiker();

//fonction pour afficher l'incrémentation des likes au clic des coeurs
incrementMediaLikes();


//fonction pour afficher la lightBox
Lightbox.init();
}

photographersWorks();




































//une requête pour le fonctionnement du filtre et l'affichage de la gallerie filtrée
const navFilter = async () => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;



    /*************pour recuperer l id des photographes*********************************/



    // on extrait l id
    let getId = getUrl_id.slice(4);

    //on modifie type de GetId string--> number
    const newGetId = Number(getId);




    //on recupère la nodeliste des photographes dans le Json
    const photographersList = data.photographers;
    const photographersMedia = data.media;




    /***************************************************/
    let lastName = "";
    for (let namePhotograph of photographersList) {
        if (namePhotograph.id === newGetId) {
            let name = namePhotograph.name;
            let nameCut = name.split(' ');
            lastName = nameCut[1];
        }
    };
    /**************************************************/

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


    /*filtre déroulant*/
    const arrowDown = document.querySelector(".fa-chevron-down");
    const chevronUp = document.querySelector(".fa-chevron-up")
    const sousMenu = document.querySelector(".sous-menu");
    const divContentNav = document.getElementById("list-filter");
    const byTitle = document.querySelector(".sort_by_title");
    const byDate = document.querySelector(".sort_by_date");
    const byPopular = document.querySelector(".by-popular");


    function shownav() {
        divContentNav.addEventListener("mouseover", function () {
            sousMenu.style.display = "block";
            arrowDown.style.display = "none";
            chevronUp.style.display = "block";
        })
    }
    shownav();

    function livenav() {
        divContentNav.addEventListener("mouseleave", function () {
            sousMenu.style.display = "none";
            arrowDown.style.display = "block";
            chevronUp.style.display = "none";

        }, true)
    }
    livenav();



    /********************************************************************************************************/

    //fonction : trier par dates
    const sortByDate = () => {
        let arrayDate = [];
        for (let valueDate of photographersMedia) {
            if (valueDate.photographerId === newGetId) {
                //arrayDate.push(valueDate.date)
                arrayDate.push(valueDate)
            }
        }

        const date = e => e.date;
        let orderByDate = []
        orderByDate = arrayDate.sort(date).reverse();

        orderByDate.forEach(objet => {
            if (objet.photographerId === newGetId && objet.image) {
                works.innerHTML +=
                    `<article id ="${objet.photographerId}">
                    <div class = "gallery">
                        <a href="./Photos/gallery/${lastName}/${objet.image}">
                            <img class="pictures-list" src = "./Photos/gallery/${lastName}/${objet.image}">
                        </a>    
                    </div>
                    <div class="info_media">
                        <h3>${objet.title}</h3>
                        <p class= "nb-likes">${objet.likes}</p>
                        <button class = "likes_media"><i class="fas fa-heart "></i></bouton>
                    </div>
             </article>`
            }
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

    byDate.addEventListener("click", function (event) {
        works.innerHTML = "";
        event.preventDefault();
        sortByDate();
        Lightbox.init();
    })

    /****************************************************************************************************************************/
    //fonction : trier par popularité
    const sortByLikes = () => {

        let arrayLikes = [];
        for (let nbLikes of photographersMedia) {
            if (nbLikes.photographerId === newGetId) {
                arrayLikes.push(nbLikes);
            }
        }

        const byLikes = (a, b) => {
            return b.likes - a.likes
        }

        let orderByLikes = arrayLikes.sort(byLikes);
        orderByLikes.forEach(valueLikes => {
            if (valueLikes.photographerId === newGetId && valueLikes.image) {
                works.innerHTML +=
                    `<article id ="${valueLikes.photographerId}">
                <div class = "gallery">
                    <a href="./Photos/gallery/${lastName}/${valueLikes.image}">
                        <img class="pictures-list" src = "./Photos/gallery/${lastName}/${valueLikes.image}">
                    </a>
                </div>
                <div class="info_media">
                    <h3>${valueLikes.title}</h3>
                    <p class= "nb-likes">${valueLikes.likes}</p>
                    <button class = "likes_media"><i class="fas fa-heart "></i></bouton>
                </div>
         </article>`
            }
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


    byPopular.addEventListener("click", function (event) {
        works.innerHTML = "";
        event.preventDefault();
        sortByLikes();
        Lightbox.init();
    })


    /****************************************************************************************************************************/
    //fonction trier par ordre alphabetique
    const showTitle = document.getElementsByTagName("h3")
    const sortByABC = () => {

        let arrayMediaTitle = [];
        for (let titleMedia of photographersMedia) {
            if (titleMedia.photographerId === newGetId) {
                arrayMediaTitle.push(titleMedia)
            }
        }
        let orderByTitle = arrayMediaTitle.sort(function compare(a, b) {
            if (a.title < b.title)
                return -1;
            if (a.title > b.title)
                return 1;
            return 0;
        });

        orderByTitle.forEach(infoTitle => {
            if (infoTitle.photographerId === newGetId && infoTitle.image) {
                works.innerHTML +=
                    `<article id ="${infoTitle.photographerId}">
                    <div class = "gallery">
                        <a href="./Photos/gallery/${lastName}/${infoTitle.image}">
                            <img class="pictures-list" src = "./Photos/gallery/${lastName}/${infoTitle.image}">
                        </a>
                            </div>
                    <div class="info_media">
                        <h3>${infoTitle.title}</h3>
                        <p class= "nb-likes">${infoTitle.likes}</p>
                        <button class = "likes_media"><i class="fas fa-heart "></i></bouton>
                    </div>
             </article>`
            }
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


    byTitle.addEventListener("click", function (event) {
        works.innerHTML = "";
        event.preventDefault();
        sortByABC();
        Lightbox.init();

    })
}
navFilter();
















