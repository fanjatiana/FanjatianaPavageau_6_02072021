export const addImages = () =>{
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
}