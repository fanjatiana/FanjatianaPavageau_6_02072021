




/*works.innerHTML +=
`<div id="lightbox">
    <button class = "lightbox__close">fermer</button>
    <button class = "lightbox__next">suivant</button>
    <button class = "lightbox__prev">précédent</button>
    <div class= "lightbox__container">
        <img class="ligthbox_img" src ="">  
    </div>
</div>`*/

/**
 * @property {HTMLElement} element
 * 
 */


class lightbox {
    static init() {
        const mediaLinks = document.querySelectorAll('a[href$=".jpg"], a[href$=".png"],a[href$=".jpeg"], a[href$=".mp4"]');
        console.log(mediaLinks)
        mediaLinks.forEach(link => link.addEventListener("click", e => {
            e.preventDefault();
            new lightbox(e.currentTarget.getAttribute('href'));
        }));
    }


    /**
     * 
     * @param {string} url URL de l'image 
     */

    constructor(url) {
        this.element = this.buildDOM(url);
        this.loadImage(url);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        document.addEventListener("keyup", this.onKeyUp)
    }


    /**
    * 
    * @param {string} url URL de l'image 
    */

    loadImage(url) {
        const image = new image();
        const container = this.element.querySelector(".lightbox__container");
        const loader = document.createElement("div");
        loader.classList.add("lightbox__loader");
        container.appendChil(loader);
        image.onload = function () {
            container.removeChild(loader);
            container.appendChild(image)

        }
        image.src = url;
    }


    /**
     * 
     * @param {keyboardEvent} e 
     */

    onKeyUp(e) {
        if (e.key === "Escape") {
            this.close(e)
        }
    }

    /**
     * Permet de fermer la lightBox
     * @param {MouseEvent} e 
     */

    close(e) {
        e.preventDefault();
        this.element.classList.add("fadeOut");
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500);
        document.removeEventListener("keyup", this.onKeyUp);
    }

    /**
     * 
     * @param {string} url URL de l'image
     * @return {HTMLElement} 
     */

    buildDOM(url) {
        const dom = document.createElement('div');
        dom.id.add('lightbox');
        dom.innerHTML = `<button class = "lightbox__close">fermer</button>
    <button class = "lightbox__next">suivant</button>
    <button class = "lightbox__prev">précédent</button>
    <div class= "lightbox__container"></div>`
        dom.querySelector(".lightbox__close").addEventListener("click", this.close.bind(this))
        return dom
    }
}











lightbox.init()


