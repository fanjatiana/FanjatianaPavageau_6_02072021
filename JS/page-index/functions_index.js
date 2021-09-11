/* eslint-disable import/prefer-default-export */

// fonction générique pour ajouter la liste des photographes et leurs tags associés
export const addContent = (element) => {
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
};

// ajout de la div : passer au contenu dans le html
export const showDivGotToContent = () => {
  const body = document.querySelector('body');
  body.insertAdjacentHTML(
    'afterbegin',
    `<div id ="go-to-content">
            <a class="link_go-to-content" href="#gallery-photographers" title="cliquez pour passer au contenu">
                <h3>Passer au contenu</h3>
            </a>
        </div>`,
  );

  // évènement d'apparition de la div au scroll de la page
  const divGoToContent = document.getElementById('go-to-content');
  body.onscroll = () => {
    divGoToContent.style.display = 'block';
  };
};
