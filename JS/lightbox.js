import {enableBodyScroll, disableBodyScroll} from "./body-scroll-lock.js";



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
 * @property {string[]} images chemins des images de la lightbox
 * @property {string} url image actuellement affichée
 * 
 */


export class Lightbox {
    static init() {
        const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'));
       console.log(links);
        const gallery = links.map(link => link.getAttribute("href"))
        console.log(gallery)
            links.forEach(link => link.addEventListener("click", e => {
                e.preventDefault();
                new Lightbox(e.currentTarget.getAttribute('href'), gallery);
            }));
    }


    /**
     * 
     * @param {string} url URL de l'image 
     * @param {string[]} images chemins des images de la lightbox
     */

    constructor(url, images) {
        this.element = this.buildDOM(url);
        this.images = images;
        this.loadImage(url);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        disableBodyScroll(this.element);
        document.addEventListener("keyup", this.onKeyUp);
    }


    /**
    * 
    * @param {string} url URL de l'image 
    */

    loadImage(url) {
        this.url = null
        const image = new Image();
        const container = this.element.querySelector(".lightbox__container");
        container.innerHTML = "";
        image.onload = () => {
            container.appendChild(image);
            this.url = url;
        }
        image.src = url;
    }


    /**
     * 
     * @param {MouseEvent|keyboardEvent} e 
     */

    onKeyUp(e) {
        if (e.key === "Escape") {
            this.close(e);
        } else if (e.key === "ArrowLeft") {
            this.prev(e);
        } else if (e.key === "ArrowRigth") {
            this.next(e);
        }
    }    


        /**
         * Permet de fermer la lightBox
         * @param {MouseEvent} e 
         */

        close(e) {
            e.preventDefault();
            this.element.classList.add("fadeOut");
            enableBodyScroll(this.element);
            window.setTimeout(() => {
                this.element.parentElement.removeChild(this.element)
            }, 500);
            document.removeEventListener("keyup", this.onKeyUp);
        }

        next(e){
            e.preventDefault();
            let i = this.images.findIndex(image => image === this.url);
            if (i === this.images.length - 1) {
                i = -1;
            }
            this.loadImage(this.images[i + 1]);
        }

        prev(e){
            e.preventDefault();
            let i = this.images.findIndex(image => image === this.url);
            if (i === 0) {
                i = this.images.length;
            }
            this.loadImage(this.images[i - 1]);
        }

        /**
         * 
         * @param {string} url URL de l'image
         * @return {HTMLElement} 
         */

        buildDOM(url) {
            const dom = document.createElement('div');
            dom.classList.add('lightbox');
            dom.innerHTML = `<button
            class="lightbox__close">fermer</button>
            <button class="lightbox__next">suivant</button>
            <button class="lightbox__prev">précédent</button>
            <div class="lightbox__container"></div>`
            dom.querySelector(".lightbox__close").addEventListener("click", this.close.bind(this));
            dom.querySelector(".lightbox__next").addEventListener("click", this.next.bind(this))
            dom.querySelector(".lightbox__prev").addEventListener("click", this.prev.bind(this))
            return dom
        }
    }


   










