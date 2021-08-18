import { photographersMedia } from "./let-and-const_page-photographers.js";
import { newGetId } from "./functions_showInfoPhotographer_page2.js";
import { photographersList } from "../page-index/let-and-const_index.js";



//recupérer la liste des noms et prénoms des photographes dans le fichier json (photographers.name) puis découpage en 2 tableau et récupération des noms de familles avec la methode split
export let lastName = "";
(function () {
    for (let namePhotograph of photographersList) {
        if (namePhotograph.id === newGetId) {
            let name = namePhotograph.name;
            let nameCut = name.split(' ');
            lastName = nameCut[1];
        }
    };

})();

//fonction pour afficher les images
export function addImages() {
    //ajout des images
    for (let element of photographersMedia) {
        if (element.photographerId === newGetId && element.image) {
            document.getElementById("works-list").innerHTML +=
                `<article id ="${element.photographerId}">
                    <div class = "gallery">
                        <a href="./Photos/gallery/${lastName}/${element.image}">
                            <img class="pictures-list" src = "./Photos/gallery/${lastName}/${element.image}" alt ="${element.description}">
                        </a>
                    </div>
                    <div class="info_media">
                        <h3>${element.title}</h3>
                        <p class= "nb-likes">${element.likes}</p>
                        <button class = "likes_media"><i class="fas fa-heart "></i></bouton>
                    </div>
             </article>`
        }
    };

}

//fonction pour afficher les videos
export function addVideo() {
    //ajout des vidéos
    for (let info of photographersMedia) {
        if (info.photographerId === newGetId && info.video) {
            document.getElementById("works-list").innerHTML +=
                `<article id ="${info.photographerId}">
            <div class="gallery">
                <a href="./Photos/gallery/${lastName}/${info.video}">
                    <video controls width="500">
                        <source src="./Photos/gallery/${lastName}/${info.video}" type="video/mp4">
                    </video>
                </a>
            </div>
            <div class="info_media">
                <h3>${info.title}</h3>
                <p class="nb-likes">${info.likes}</p>
                <button class ="likes_media"><i class="fas fa-heart"></i></bouton>
            </div>   
        </article>`
        }
    }

}

//fonction pour afficher le compteur like

export function addCounterLiker() {
    /****************************************************partie compteur prix/jour********************************/
    let totalPrice = [];

    //on recupere tous les prix du photographe associé et on les ajoute dans un tableau
    photographersList.forEach(value => {
        if (value.id === newGetId) {
            totalPrice.push(value.price);
        }
    });

    //on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
    let priceOfPhotographers = 0;
    for (let price = 0; price < totalPrice.length; price++) {
        priceOfPhotographers += parseFloat(totalPrice[price])
    }

    //on recupere tous les likes du photographe associé et on les ajoute dans un tableau
    let totalLikes = [];
    photographersMedia.forEach(value => {
        if (value.photographerId === newGetId) {

            totalLikes.push(value.likes);
        }
    });

    //on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
    let likesOfPhotographers = 0;
    for (let nbLike = 0; nbLike < totalLikes.length; nbLike++) {
        likesOfPhotographers += parseFloat(totalLikes[nbLike])
    }

    // ajout du bloc compteur de like
    (function(){
        document.getElementById("works-list").innerHTML +=
        `<div id="like_counter">
    <p id="total-likes">${likesOfPhotographers}<i class="fas fa-heart"></i></p>
    <p>${priceOfPhotographers}€ / jour</p>
    </div>`
    })();  

}

//fonction pour l'incrémentation des likes

export function incrementMediaLikes (){


    const buttonHearts = document.querySelectorAll(".likes_media");
    const nbLikes = document.querySelectorAll(".nb-likes");


    buttonHearts.forEach(heart => {

        heart.addEventListener("click", function () {

            let arrayValue = heart.previousElementSibling;
            let likeCount = Number(arrayValue.innerText);
            likeCount++;
            console.log(likeCount)

            nbLikes.innerHTML = likeCount;

        });


    })
}