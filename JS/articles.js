/********************************* DOM ****************************************/
const article = document.querySelector('article');
const idPhotograph = document.getElementsByClassName('.id-photograph');
const infosPhotograph = document.getElementsByClassName('.infos-photograph');
const tagLinks = document.getElementsByClassName('.tag-links');
const container = document.getElementById('container');

/*************************************************************************** */

/*fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    .then(response => response.json())
    .then(pictures => console.log(pictures))*/



/*chargement du fichier Json avec l'URL*/
const getPictures = async () => {
    let response = await fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    let data = await response.json()
    console.log(data.photographers);

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
                ` <li class = "tags"><a href="#">#${photographersTags}</a></li>`
        })
    }
}
getPictures();









