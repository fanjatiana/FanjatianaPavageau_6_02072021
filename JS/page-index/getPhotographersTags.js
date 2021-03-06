// requête pour afficher les tags des photographes

// eslint-disable-next-line import/prefer-default-export
export const getPhotographersTags = async () => {
  const response = await fetch('./JS/data.json');
  const data = await response.json().catch((error) => {
    // Une erreur est survenue
    console.log(error);
  });
  const photographersList = data.photographers;

  // on recupère dans le JSON la liste des tags qu'on va ajouter dans un tableau
  const tagsArray = [];
  photographersList.map((tags) => tagsArray.push(...tags.tags));

  // on supprime les tags doublons du tableau
  const uniqueSet = new Set(tagsArray);
  const backToArrayTags = [...uniqueSet];

  /* on affiche le nouveau tableau des tags
    et on les ajoute en tant que liens dans la partie navigation (nav) du html */
  const baliseUL = document.querySelector('.links-list');

  backToArrayTags.forEach((element) => {
    const tagsTheme = element;
    baliseUL.innerHTML += `<li><a class="links links-filter" href="" title="lien tag pour filtrer la liste des photographes">#${tagsTheme}</a></li>`;
  });
};
