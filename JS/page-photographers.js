// import des constantes de DOM-constantes
import { showPhotograph, titlePagePhotograph, works, worksFilter } from "./let-and-const_page-photographers.js"

import { getUrl_id } from "./variables.js";
import { Lightbox } from "../LightBox/lightbox.js";




const idPhotograph = async () => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();

    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;

    //on recupère la nodeliste des photographes dans le Json
    const photographersList = data.photographers;

    // on extrait l id
    let getId = getUrl_id.slice(4);

    //on modifie type de GetId string--> number
    const newGetId = Number(getId);

    
    // on va rechercher dans le Json l'id correspondant à la variable newGetId avec la methode find
    const photographSelected = photographersList.find((element) => element.id === newGetId);

    /***********************************************ajout des informations du photographe************************************************************/

    //on ajoute le contenu html avec les données de chaques photographes correspondant à l Id de l'url
    showPhotograph.innerHTML +=
        `<div id = "presentation ${photographSelected.id}">
        <h1>${photographSelected.name}</h1>
        <p>${photographSelected.city}, ${photographSelected.country}</p>
        <p>${photographSelected.tagline}</p>
        <ul id="tagsList${photographSelected.tags}"></ul>
    </div>
    <div id ="id-photo">
        <img src="/Photos/gallery/Photographers-Photos/${photographSelected.portrait}">
    </div>
    `
    let showTagsList = document.getElementById("tagsList" + photographSelected.tags);
    photographSelected.tags.forEach(allTags => {
        showTagsList.innerHTML +=
            `<li class ="tags"><a class = "links" href="#"> #${allTags}</a></li>`
    })

    //ajout du nom du photographe en tant que titre de la page
    titlePagePhotograph.innerHTML += photographSelected.name;

    /**********************************************************************************************************************************************/


    /*********************fonction ouverture/fermeture du formulaire + ajout du nom du photographe en dynamique******************************************/

    const btnContact = document.getElementById("btn");
    const modaleWindow = document.getElementById("modale");
    const btnCloseModal = document.querySelector(".close");

    //fonction affichage  du formulaire
    function launchModal() {
        modaleWindow.style.display = "block";
    }

    btnContact.addEventListener("click", launchModal);

    //fonction fermeture du formulaire 
    const closeModal = () => {
        modaleWindow.style.display = "none";
    }

    btnCloseModal.addEventListener("click", closeModal);



    //h2 : ajout nom du photographe dans le formulaire avec une boucle for
    const titleName = document.getElementById("recipient-name");
    for (let element of photographersList) {
        if (element.id === newGetId) {
            titleName.innerHTML = `Contactez-moi<br>${element.name}`;

        }
    }
    /**********************************************************************************************************************************************/


    /*************************************************controles de saisi du formulaire***************************************************************/


    //variables regex
    let regexNameAndLastName = /^[A-Za-z ,.'-]+$/i;
    let regexEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const infoGuest = document.querySelectorAll('.info-id');
    const submitForm = document.getElementById("submit-form");
    const infoEmail = document.getElementById("email");
    const message = document.getElementById("yourmessage");

    const controlInput = () => {
        let count = 0;
        infoGuest.forEach(info => {
            if (info.validity.valueMissing) {
                info.closest(".info-form").setAttribute("data-error", "Veuillez remplir le formulaire");
                info.style.borderColor = "#f70707";

            } else if (info.value.length < 2) {
                info.closest(".info-form").setAttribute("data-error", "Veuillez entrer entre 2 et 30 caractères pour valider ce champ ");
                info.style.borderColor = "#f70707";

            } else if (!regexNameAndLastName.test(info.value)) {
                info.closest(".info-form").setAttribute("data-error", " Ecrivez en miniscule ou majuscule , pas de nombre, seuls caractères autorisés: . - ' et espaces");
                info.style.borderColor = "#f70707";


            } else {
                info.closest(".info-form").setAttribute("data-error", "");
                info.style.borderColor = "";
                count++
            }
        });
        if (count == infoGuest.length) {
            return true;
        }
    }

    const controlEmail = () => {
        if (infoEmail.validity.valueMissing) {
            infoEmail.closest(".info-form").setAttribute("data-error", "Veuillez remplir ce champ");
            infoEmail.style.borderColor = "#f70707";

        } else if (!regexEmail.test(infoEmail.value)) {
            infoEmail.closest(".info-form").setAttribute("data-error", "Veuillez rentrer une adresse email valide (par exemple: monemail@yahoo.com");
            infoEmail.style.borderColor = "#f70707";

        } else {
            infoEmail.closest(".info-form").setAttribute("data-error", "");
            infoEmail.style.borderColor = "";
            return true;
        }

    }

    const controlMessage = () => {
        if (message.value == "") {
            message.closest(".info-form").setAttribute("data-error", "Veuillez remplir ce champ");
            message.style.borderColor = "#f70707";

        } else {
            message.closest(".info-form").setAttribute("data-error", "");
            message.style.borderColor = "";
            return true;
        }
    }
    /************************************************************Envoie duformulaire******************************************************************/

    /* on crée une fonction validation du formulaire, 
    on annule les messages d'alerte par défaut */

    const controlValidateForm = (event) => {
        event.preventDefault();
        /*on appelle toutes les fonctions*/
        const inputValid = controlInput();
        const emailValid = controlEmail();
        const messageValid = controlMessage();

        /*on verifie la validité de chaques input puis on ferme le modale si c'est "true" 
        et enfin on  affiche un message de validation d'envoie du formulaire*/
        if (inputValid && emailValid && messageValid) {
            closeModal();
        } else {
            return false;
        }
    }


    /*on cré un évènement au click sur le bouton submit avec la fonction validate  pour l'envoie du formulaire, 
    et l'action par défaut du submit n'est pas exécuté tant que les valeurs sont : false*/
    submitForm.addEventListener("click", controlValidateForm, (event) => {
        event.preventDefault();
    });

}
idPhotograph();



























const photographersWorks = async () => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;


    //on recupere la liste des photographes dans le data
    let photographersList = data.photographers;

    //on recupère la nodeliste des medias des photographes dans le Json
    let photographersMedia = data.media;

    /*********************pour recuperer l id des photographes*************************************/
    //on extrait l id en supprimant les 4 premiers caractères
    let getId = getUrl_id.slice(4);

    //on modifie type de GetId string--> number
    const newGetId = Number(getId);


    /************************************************************************************ajout des articles******************************************************** */

    //recupérer la liste des noms et prénoms des photographes dans le fichier json (photographers.name) puis découpage en 2 tableau et récupération des noms de familles avec la methode split
    let lastName = "";
    for (let namePhotograph of photographersList) {
        if (namePhotograph.id === newGetId) {
            let name = namePhotograph.name;
            let nameCut = name.split(' ');
            lastName = nameCut[1];
        }
    };

    //ajout des images
    for (let element of photographersMedia) {
        if (element.photographerId === newGetId && element.image) {
            works.innerHTML +=
                `<article id ="${element.photographerId}">
                    <div class = "gallery">
                        <a href="./Photos/gallery/${lastName}/${element.image}">
                            <img class="pictures-list" src = "./Photos/gallery/${lastName}/${element.image}">
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

    //ajout des vidéos
    for (let info of photographersMedia) {
        if (info.photographerId === newGetId && info.video) {
            works.innerHTML +=
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
  
    
    /****************************************************partie compteur prix/jour********************************/

    //on recupere tous les prix et les likes du photographe associé et on les ajoute dans un tableau
    let totalPrice = [];
    
    photographersList.forEach(value => {
        if (value.id === newGetId) {
            totalPrice.push(value.price);
        }
    });
    

    let totalLikes = [];
    photographersMedia.forEach(value => {
        if (value.photographerId === newGetId) {

            totalLikes.push(value.likes);
        }
    });
   

    //on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
    let priceOfPhotographers = 0;
    for (let price = 0; price < totalPrice.length; price++) {
        priceOfPhotographers += parseFloat(totalPrice[price])
    }
    //on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
    let likesOfPhotographers = 0;
    for (let nbLike = 0; nbLike < totalLikes.length; nbLike++) {
        likesOfPhotographers += parseFloat(totalLikes[nbLike])
    }

    // ajout du bloc compteur de like
    works.innerHTML +=
        `<div id="like_counter">
    <p id="total-likes">${likesOfPhotographers}<i class="fas fa-heart"></i></p>
    <p>${priceOfPhotographers}€ / jour</p>
    </div>`

  
    /***************************************************partie incrémentation au click des likes*******************/


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

    
   
    Lightbox.init();
}   


photographersWorks();





































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
















