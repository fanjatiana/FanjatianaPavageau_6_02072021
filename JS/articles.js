/********************************* DOM ****************************************/
const article = document.querySelector('article');
const idPhotograph = document.getElementById('id-photograph');
const infosPhotograph = document.getElementById('infos-photograph');
const tagLinks= document.getElementById('tag-links');
const paragraph = document.getElementsByClassName('.paragraph');

/*************************************************************************** */

/*fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    .then(response => response.json())
    .then(pictures => console.log(pictures))*/



//chargement du fichier Json avec l'URL



const getPictures = async () => {
    let response = await fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    let data = await response.json()
    console.log(data.photographers[0]);

   
    let photographersList = data.photographers;
    let photographersMedia = data.media;
    
    for (let element of photographersList){
  

            article.innerHTML= 
            "<h3>" + data.photographers[0]['name'] + "</h3>" 
            + "<p>" + data.photographers[0]['id'] + "</p>" +
            "<p>" + data.photographers[0]['city'] + "</p>" +
            "<p>" + data.photographers[0]['country'] + "</p>" +
            "<ul>" + "<li>" + "<a href='#'>" + "#" +data.photographers[0]['tags']+ "</a>" + "</li>" + "</ul>" ;
           
    

    }
    
    

    
    
    //const name = data['photographers'][0]['name'];

    
  
  

       
   

    
    
    /*for (let element of photographersList){
       
       article.innerHTML= "<h3>" + element.name + "</h3>" +
       "<p>" + element.id + "</p>" +
       "<p>" + element.city + "</p>" +
       "<p>" + element.country + "</p>" +
       "<ul>" + "<li>" + "<a href='#'>" + "#" +element.tags[0] + "</a>" + "</li>" + "</ul>" +
       "<ul>" + "<li>" + "<a href='#'>" + "#" +element.tags[1] + "</a>" + "</li>" + "</ul>" ;
    }*/

    
    
  }
  getPictures();









