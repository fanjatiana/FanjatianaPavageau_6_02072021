export const getPhotographersTags = async () => {
  const response = await fetch("./JS/data.json");
  const data = await response.json().catch(function error(err) {
    // Une erreur est survenue
    alert(err);
  });
  const photographersList = data.photographers;

    // on recupère dans le JSON la liste des tags qu'on va ajouter dans un tableau
    let tagsArray = [];
    photographersList.forEach((tags) => {
      let arrayList = tags.tags;
      for (let tagName of arrayList) {
        tagsArray.push(tagName);
      }
    });

    //on supprime les tags doublons du tableau
    let uniqueSet = new Set(tagsArray);
    let backToArrayTags = [...uniqueSet];

    /*on affiche le nouveau tableau des tags 
    et on les ajoute en tant que liens dans la partie navigation (nav) du html*/
    const baliseUL = document.querySelector(".links-list");

    backToArrayTags.forEach((element) => {
      let tagsTheme = element;
      baliseUL.innerHTML += `<li><a class = "links links-filter" href="">#${tagsTheme}</a></li>`;
    });
  }

