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

/*******************************************************************requête filtre************************************************************************************** */

const filtrePhotographersWorks = async () => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;


    //on recupère la nodeliste des photographes dans le Json
    let photographersList = data.photographers;

    //on recupère dans le DOM l'Id de la section filter-sort-by
    const worksFilter = document.getElementById("filter-sort-by");



    worksFilter.innerHTML +=
        `<h2>Trier par</h2>
    <ul id="list-filter">
        <li><a href="">Popularité</a></li>
        <li><a href="">Date</a></li>
        <li><a href="">Titre</a></li>
    </ul>`
}

filtrePhotographersWorks();


/************************************************requete liste photos et videos*******************/

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
   
        
          
            for ( let namePhotograph of photographersList){
                
                let name = namePhotograph.name;
                let nameCut = name.split(' ');
                lastName = nameCut[1];
                console.log(lastName)
                   
            } 
         
            for(let element of photographersMedia){
            if(element.photographerId === newGetId && element.image){
                console.log(element)
                works.innerHTML +=
                `<article id ="artistArticle ${element.photographerId}" class = "pictures video">
                <img class="picturesList" src = "./Photos/gallery/${lastName}/${element.image}">
                <h3>${element.title}</h3>
                <p>${element.likes}</p>
             </article>`

           
        }

       

    }

    for(let e of photographersMedia){
        
        if(e.photographerId === newGetId && e.video){
            works.innerHTML +=
        `<article id ="artistArticle ${e.photographerId}" class = "pictures video">
                <video controls width="500">
            <source src="./Photos/gallery/${lastName}/${e.video}" type="video/mp4">
        </video>
                <h3>${e.title}</h3>
                <p>${e.likes}</p>
             </article>`
    }
}
   




/*photographersMedia.forEach(element => {


        if (element.photographerId === newGetId) {
            console.log(element)
            works.innerHTML +=
            `<article id ="${element.photographerId}" class = "pictures">
            
            <h3>${element.title}</h3>
            <p>${element.likes}</p>
         </article>`

        }
        
        
    });$*/




   


/***********************************************************************ajout des images************************************************************************ */
    /*for (i = 0; i < photographersList.length; i++) {
        const pictures = document.querySelector(".pictures");
        console.log(pictures)
        let name = photographersList[i].name;
        let nameCut = name.split(' ');
        let lastName = nameCut[1];

        photographersMedia.forEach(element => {
            if (element.photographerId === newGetId) {
                pictures.innerHTML +=
                    `<img class="picturesList" src = "./Photos/gallery/${lastName}/${element.image}">`
            }


        })

    }  */
};

photographersWorks();




















/****************************************************************************************************************************************************** */


    /*boucle pour récupérer tous les noms des photographes;

    
    for (i = 0; i < photographersList.length; i++) {
        let name = photographersList[i].name;
        let nameCut = name.split(' ');
        let lastName=nameCut[1];
        console.log(lastName)

        /*works.innerHTML +=
        `<article id ="${mediaSelected.photographerId}" class = "video">
        <video controls width="500">
            <source src="./Photos/gallery/${lastName}/${mediaSelected.video}" type="video/mp4">
        </video>
        <h3>${mediaSelected.title}</h3>
        <p>${mediaSelected.likes}</p>
     </article>`*/


 /*works.innerHTML +=
             `<article id ="${mediaSelected.photographerId}" class = "video">
             <video controls width="500">
                 <source src="./Photos/gallery/${lastName}/${mediaSelected.video}" type="video/mp4">
             </video>
             <h3>${mediaSelected.title}</h3>
             <p>${mediaSelected.likes}</p>
          </article>`*/