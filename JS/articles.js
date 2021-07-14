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

    /*on cré et initialise une variable pour le nombre de liens tag des photographes*/
    let numbTags = 0;


    /*boucle for pour ajouter les articles des photographes*/
    for (let element of photographersList) {

        /* création de variables pour recupérer les données json*/
        let portrait = element.portrait;
        let name = element.name;
        let city = element.city;
        let price = element.price;
        let country = element.country;
        let tagline = element.tagline;
        let tags = element.tags;

        /*on incrémente la variable pour recupérer le nombre de tags des photographes*/
        numbTags++;

        /*on cré un bloc de code dans le html qui affichera les photos et infos des photographes*/
        container.innerHTML +=
            `<article>
           <section class="id-photograph">
               <a href="#">
                   <img src="/Photos/gallery/Photographers-Photos/${portrait}">
                   <h2>${name}</h2>
               </a>
           </section>
           <section class="infos-photograph">
               <p>${country}, ${city}</p>
               <p>${tagline}</p>
               <p>${price}€/jour</p>
           </section>
           <section class="tag-links">
               <ul id="tagList${numbTags}"></ul>
           </section>
       </article>`;

        /*on effectue une boucle forEach pour ajouter les liens des tags associés aux photographes*/
        let tagList = document.getElementById("tagList" + numbTags);
        [...tags].forEach(photographersTags => {
            tagList.innerHTML +=
                ` <li class = "tags" "><a class = "links" href="#">#${photographersTags}</a></li>`
        })

    }

  
    let listTags = data.photographers;

  
  function filterOfPhotographers () {
    container.innerHTML = ""; 
  listTags.filter(function (element) {
    
        for (let i = 0; i < element.tags.length; i++) {
            container.innerHTML += " ";
            if (element.tags[i] === 'events') {
                
                console.log(element)
               

                let photographName = element.name;
                let photographCity = element.city;
                let photographCountry = element.country;
                let photographPrice = element.price;
                let photographTagline = element.tagline;
                let photographPortrait = element.portrait;

                container.innerHTML +=
            `<article>
           <section class="id-photograph">
               <a href="#">
                   <img src="/Photos/gallery/Photographers-Photos/${photographPortrait}">
                   <h2>${photographName}</h2>
               </a>
           </section>
           <section class="infos-photograph">
               <p>${photographCountry}, ${photographCity} </p>
               <p>${photographTagline}</p>
               <p>${photographPrice}€/jour</p>
           </section>
           <section class="tag-links">
               <ul id="tagList${numbTags}"></ul>
           </section>
       </article>`
                
            } 
        }
    }); 
  }

  filterOfPhotographers();
    

   

}  

getPictures();


/****************************************** Requête pour la partie navigation***************************************/

const getTags = async () => {
    let responseTags = await fetch("./JS/data.json");
    let tagsLinks = await responseTags.json();
    let err2 = function (err2) {
        // Une erreur est survenue
        alert(err2);
    };
    err2;


    /*création d'une variable contenant la liste des photographes*/
    let listOfPhotographers = tagsLinks.photographers;


    /*on recherche dans le DOM la balise NAV contenant la classe nav-tag-links pour pouvoir plus tard y afficher la liste des liens de navigation*/
    const nav = document.querySelector('.nav-tag-links');

    /*on cré un  tableau vide et on utilise des boucles pour rechercher et recupérer toute la liste des tags qu'on va ajouter dans ce tableau*/
    let tagsArray = [];
    for (let tags of listOfPhotographers) {

        let arrayList = tags.tags;
        for (let tagName of arrayList) {
            tagsArray.push(tagName);
        }
    };

    /*on supprimer les tags doublons du tableau*/
    let uniqueSet = new Set(tagsArray);
    let backToArrayTags = [...uniqueSet];


    /*on affiche le nouveau tableau des tags en tant que liens de navigation dans le html. Pour celà on cré une boucle for*/

    const navUl = document.querySelector(".links-list");

    for (let elements of backToArrayTags) {
        let tagsTheme = elements;

        navUl.innerHTML += `
        
                <li><a class = "links" href=""># ${tagsTheme}</a></li>
            `
    }

    /*on applique le systeme de filtre*/

 



    /**************************************************************************************************************************************************************/
    /*function monfiltre (element, index, self){
        console.log(element);
        console.log(index);
        console.log(self);
    }

    monfiltre();*/


    /*premiere methode pour filtrer les #portrait
    let listTagPortrait = listTags.filter(function (element) {
        for (let i = 0; i < element.tags.length; i++) {
            if (element.tags[i] === 'portrait') {
                return element;
            }
        }
    });

    console.log(listTagPortrait);


/**************************************************************************************************************************************************************/

}

getTags();














