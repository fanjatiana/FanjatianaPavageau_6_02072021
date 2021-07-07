/********************************* DOM ****************************************/
const article = document.getElementById('id-photographers');
const idPhotograph = document.getElementById('id-photograph');
const infosPhotograph = document.getElementById('infos-photograph');
const tagLinks= document.getElementById('tag-links');
const paragraph = document.getElementsByClassName('.paragraph');
const container = document.getElementById('container');
const list = document.querySelector('.list');
console.log(article)

/*************************************************************************** */

/*fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    .then(response => response.json())
    .then(pictures => console.log(pictures))*/



//chargement du fichier Json avec l'URL



const getPictures = async () => {
    let response = await fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    let data = await response.json()
    console.log(data.photographers);
   

   
    let photographersList = data.photographers;
    let photographersMedia = data.media;
    
    for (let element of photographersList){
        let portrait = element.portrait;
        let name = element.name;
        let city = element.city;
        let price = element.price;
        let country = element.country;
        let tagline = element.tagline;
        let tags = element.tags;
        
        article.innerHTML += 
        `
           <section id="id-photograph">
               <a href="#">
                   <img src="/Photos/gallery/Photographers-Photos/${portrait}">
                   <h2>${name}</h2>
               </a>
           </section>
           <section id="infos-photograph">
               <p>${country}, ${city}</p>
               <p>${tagline}</p>
               <p>${price}€/jour</p>
           </section>

       `;

       for (var j = 0; j < tags.length; j++) {
        var listTags = document.createElement('li');
        listTags.textContent = tags[j];
       article.appendChild(listTags);
      }
    
    
    }
    
    

    
    
  }
  getPictures();








/*  <section id="tag-links">
<ul>
<li><a href="#">#${tags}</a></li>

</ul>
</section>*/