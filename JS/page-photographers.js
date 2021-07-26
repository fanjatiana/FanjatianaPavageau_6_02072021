const idPhotograph = async () => {
    let response = await fetch("./JS/data.json")
    let data = await response.json();
    let err = function (err) {
        // Une erreur est survenue
        alert(err);
    };
    err;
  
    
    let photographersList = data.photographers;
    const showPhotograph = document.getElementById("show-id-photograph");

    showPhotograph.innerHTML += 
    `<div id = "presentation ${photographersList[0].id}">
        <h1>${photographersList[0].name}</h1>
        <p>${photographersList[0].city}, ${photographersList[0].country}</p>
        <p>${photographersList[0].tagline}</p>
        <ul id="tagsList${photographersList[0].tags}"></ul>
    </div>
    <div id ="id-photo">
        <img src="/Photos/gallery/Photographers-Photos/${photographersList[0].portrait}">
    </div>
    `
    let showTagsList = document.getElementById("tagsList" + photographersList[0].tags);
    photographersList[0].tags.forEach(allTags => {
        showTagsList.innerHTML +=
            `
                <li class ="tags"><a class = "links" href="#"> #${allTags}</a></li>
            `
                 
    })


    
    
  
  
    //rechercher l id dans l url
    var getUrl_id = window.location.search;
  
    //extraire l id
    let getId = getUrl_id.slice(4);
    console.log(typeof(getId));

    //afficher les photographes en fonction de l id avec la methode find

    console.log(photographersList);

    //modification type de GetId string--> number
    const newGetId = Number(getId);
    

    const photographSelected = photographersList.find((element) => element.id === newGetId);
    console.log(photographSelected)

    

    
}

idPhotograph();