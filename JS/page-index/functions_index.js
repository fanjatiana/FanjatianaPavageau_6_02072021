/* eslint-disable import/prefer-default-export */
// fonction générique pour ajouter la liste des photographes et leurs tags associés
export function addContent(element) {
  document.getElementById(
    'container',
  ).innerHTML += `<article id="${element.id}">
          <section class="photograph">
              <a id="go-to-photographer-page" href="page-photographers.html?id-${element.id}" title="lien vers la page du photographe">
                  <img src="Photos/gallery/Photographers-Photos/${element.portrait}" alt="${element.description}">
                  <h2>${element.name}</h2>
              </a>
          </section>
          <section class="infos-photograph">
              <p>${element.country}, ${element.city}</p>
              <p>${element.tagline}</p>
              <p>${element.price}€/jour</p>
          </section>
          <section class="tag-links">
              <ul id="tagList${element.tags}"></ul>
          </section>
      </article>`;

  /* on effectue une boucle forEach pour ajouter les liens des tags associés aux photographes */
  const listOfTags = document.getElementById(`tagList${element.tags}`);
  element.tags.forEach((photographersTags) => {
    listOfTags.innerHTML += ` <li class="tags"><a class="links" href="#" title="tag du photographe">#${photographersTags}</a></li>`;
  });
}
