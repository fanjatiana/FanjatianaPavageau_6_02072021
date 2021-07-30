const idPhotograph = async () => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;

    //on recupère la nodeliste des photographes dans le Json
    let photographersList = data.photographers;

    //on recupère dans le DOM l'Id de la section show-id-photograph 
    const showPhotograph = document.getElementById("show-id-photograph");


    //on recherche l id dans l url
    var getUrl_id = window.location.search;

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

    const titlePagePhotograph = document.getElementById("photograph-name");

    titlePagePhotograph.innerHTML += photographSelected.name;
}
idPhotograph();



























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

    //on recupère dans le DOM l'Id de la section works-list
    const works = document.getElementById("works-list");






    /***************************************************************************pour recuperer l id des photographes*************************************/

    //on recherche l id dans l url
    var getUrl_id = window.location.search;

    // on extrait l id
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

    //on recherche l id dans l url
    var getUrl_id = window.location.search;

    // on extrait l id
    let getId = getUrl_id.slice(4);

    //on modifie type de GetId string--> number
    const newGetId = Number(getId);


    //on recupère dans le DOM l'Id de la section works-list
    const works = document.getElementById("works-list");

    //on recupère la nodeliste des photographes dans le Json
    let photographersList = data.photographers;
    let photographersMedia = data.media;



    //on recupère dans le DOM l'Id de la section filter-sort-by
    const worksFilter = document.getElementById("filter-sort-by");
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
        arrayDate.sort();
        console.log(arrayDate)
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
























