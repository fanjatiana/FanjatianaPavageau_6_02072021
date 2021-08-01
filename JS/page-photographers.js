// import des constantes de DOM-constantes
import { showPhotograph, titlePagePhotograph, works, worksFilter } from "./DOM-constantes.js";
import { getUrl_id } from "./variables.js";



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




    
 
}

idPhotograph();

/************************************************************************Requête formulaire***********************************************************************/

const form = async () => {
    let response =  await fetch("./JS/data.json")
    let data =  await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;
//on recupère la nodeliste des photographes dans le Json
const photographersList = data.photographers;



    /***************************************************************************pour recuperer l id des photographes*************************************/
    //on extrait l id en supprimant les 4 premiers caractères
    let getId = getUrl_id.slice(4);

    //on modifie type de GetId string--> number
    const newGetId = Number(getId);

    /***********************************************************ajout du formulaire************************************ */
    const modale = document.getElementById("modale");
    for (let element of photographersList) {
        if (element.id === newGetId) {
            modale.innerHTML +=
                `<div class="content">
    <span class="close"></span>
    <div class="modal-content">
        <form name="contact" id="photographContact" action="" method="POST" onsubmit=" return validate()">
            <h2>Contactez-moi<br>${element.name}</h2> 
            <div>
                <label for="first">Prénom</label>
                <input class="text-control" type="text" id="first" name="first" minlength = "2" maxlength="30" required>
            </div>
            <div >
                <label for="last">Nom</label>
                <input class="text-control " type="text" id="last"  name="last" minlength = "2" maxlength="30" required>
            </div>
            <div>
                <label for="email">E-mail</label>
                <input class="text-control" type="email" id="email" name="email" value="" required/>
            </div>
            <div>
                <label for="yourmessage">Votre message</label>
                <textarea id="yourmessage" name="yourmessage" rows="5" cols="33"></textarea>
            </div>
            <div>
                <label for="submit-form"></label>
                <input class="btn-submit button" id="submit-form" type="button"  value="Envoyer"  />
            </div>
            </div>			
        </form>
    </div>
</div>`
        }
    }

const btnCloseModal = document.querySelector(".close");
console.log(btnCloseModal);

const btnContact = document.querySelector(".btn");
console.log(btnContact)

const modalWindow = document.getElementById("modale");
console.log(modalWindow);


//affichage du formulaire
// ouvrir le modal 
function launchModal() {
    modalWindow.style.display = "block";
  }

//ouverture de la modale au click du bouton contactez moi
btnContact.addEventListener("click", launchModal());


btnCloseModal.addEventListener("click", closeModal());
/*on définit une fonction pour faire fonctionner la croix de fermeture de la modale puis on l'applique avec l'évènement onclick*/ 
const closeModal = () => {
    modalWindow.style.display = "none";
 }






}
form();
/***********************************************************************************************************************************************/


























/************************************************REQUETE LISTE PHOTOS ET VIDEOS*********************************************/

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
    console.log(photographersMedia);








    /***************************************************************************pour recuperer l id des photographes*************************************/
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
                        <img class="pictures-list" src = "./Photos/gallery/${lastName}/${element.image}">
                    </div>
                    <div class="info_media">
                        <h3>${element.title}</h3>
                        <p>${element.likes}<a href=""><i class="fas fa-heart likes_media"></i></a></p>
                    </div>
             </article>`
        }
    };

    //ajout des vidéos
    for (let info of photographersMedia) {
        if (info.photographerId === newGetId && info.video) {
            works.innerHTML +=
                `<article id ="${info.photographerId}">
            <div>
                <video controls width="500">
                    <source src="./Photos/gallery/${lastName}/${info.video}" type="video/mp4">
                </video>
            </div>
            <div class="info_media">
                <h3>${info.title}</h3>
                <p>${info.likes}<a href=""><i class="fas fa-heart likes_media"></i></a></p>
            </div>   
        </article>`
        }
    }


    /****************************************************partie compteur prix/jour********************************/

    //on recupere tous les prix et les likes du photographe associé et on les ajoute dans un tableau
    let totalPrice = [];
    let totalLikes = [];

    for (let euro of photographersList) {
        if (euro.id === newGetId) {
            totalPrice.push(euro.price);
        }
    }

    for (let value of photographersMedia) {

        if (value.photographerId === newGetId) {

            totalLikes.push(value.likes);
        }
    }

    //on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
    let priceOfPhotographers = 0;
    for (let t = 0; t < totalPrice.length; t++) {
        priceOfPhotographers += parseFloat(totalPrice[t])
    }
    //on effectue une boucle pour parcourir le tableau et on calcule les valeurs totales
    let likesOfPhotographers = 0;
    for (let l = 0; l < totalLikes.length; l++) {
        likesOfPhotographers += parseFloat(totalLikes[l])
    }

    // ajout du bloc compteur de like
    works.innerHTML +=
        `<div id="like_counter">
    <p>${likesOfPhotographers}<i class="fas fa-heart"></i></p>
    <p>${priceOfPhotographers}€ / jour</p>
    </div>`

    /***********************************reste à faire*********************partie incrémentation au click des likes********************** */


    const linksOfHearts = document.querySelectorAll(".info_media p>a");


}
photographersWorks();





























/*******************************************************************REQUETE FILTRE************************************************************************************* */

const navFilter = async () => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;



    /***************************************************************************pour recuperer l id des photographes*************************************/



    // on extrait l id
    let getId = getUrl_id.slice(4);

    //on modifie type de GetId string--> number
    const newGetId = Number(getId);




    //on recupère la nodeliste des photographes dans le Json
    const photographersList = data.photographers;
    const photographersMedia = data.media;




    /*************************************************************************************************** */
    let lastName = "";
    for (let namePhotograph of photographersList) {
        if (namePhotograph.id === newGetId) {
            let name = namePhotograph.name;
            let nameCut = name.split(' ');
            lastName = nameCut[1];
        }
    };
    /****************************************************************************************************** */

    worksFilter.innerHTML +=
        `<h2>Trier par</h2>
    <ul id="list-filter">
        <li><a href="">Popularité</a></li>
        <li><a id="sort_by_date" href="">Date</a></li>
        <li><a href="">Titre</a></li>
    </ul>`

    /*****************************************************************************************************************/

    //fonction trier les dates des images 
    const sortByDate = () => {
        let arrayDate = [];
        for (let valueDate of photographersMedia) {
            if (valueDate.photographerId === newGetId) {
                arrayDate.push(valueDate.date)
            }
        }
        arrayDate.sort().reverse();
        console.log(arrayDate);
    }
    sortByDate();


    //fonction trier les likes
    const sortByLikes = () => {
        let arrayLikes = [];
        for (let nbLikes of photographersMedia) {
            if (nbLikes.photographerId === newGetId) {
                arrayLikes.push(nbLikes.likes);
            }
        }
        const arraySort = (a, b) => b - a;
        arrayLikes.sort(arraySort);


    }
    sortByLikes();


    //fonction trier par ordre alphabetique
    const showTitle = document.getElementsByTagName("h3")
    console.log(showTitle);
    const sortByABC = () => {

        let arrayMediaTitle = [];
        for (let titleMedia of photographersMedia) {
            if (titleMedia.photographerId === newGetId) {
                arrayMediaTitle.push(titleMedia.title)
            }
        }
        arrayMediaTitle.sort();


        arrayMediaTitle.forEach(t => {

            works.innerHTML += `<h3>${t}</h3>`
        });

        for (let work of photographersMedia) {



            if (work.photographerId === newGetId) {
                works.innerHTML +=
                    `<article id ="${work.photographerId}">
            <div class = "gallery">
                <img class="pictures-list" src = "./Photos/gallery/${lastName}/${work.image}">
            </div>
            <div class="info_media">
                
                <p>${work.likes}<a href=""><i class="fas fa-heart likes_media"></i></a></p>
            </div>
     </article>`;


            }

        }
    }




    /*********************************************************************************************************************/






    const dates = document.getElementById("sort_by_date");

    dates.addEventListener("click", function (event) {
        works.innerHTML = "";
        event.preventDefault();
        sortByABC();

    })



}



navFilter();























