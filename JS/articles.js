/********************************* DOM ****************************************/
const article = document.querySelector('article');
const idPhotograph = document.getElementById('id-photograph');
const infosPhotograph = document.getElementById('infos-photograph');
const tagLinks= document.getElementById('tag-links');

/*************************************************************************** */

/*fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    .then(response => response.json())
    .then(pictures => console.log(pictures))*/



//chargement du fichier Json avec l'URL
const getPictures = async () => {
    let response = await fetch('https://cors-anywhere.herokuapp.com/https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json')
    let data = await response.json()
    console.log(data)
  }
  getPictures()









