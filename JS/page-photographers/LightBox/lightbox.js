import {enableBodyScroll, disableBodyScroll} from "./body-scroll-lock.js";
import { addImages, addVideo } from "../functions_photographersWorks_page2.js";



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
        const baliseImg = Array.from(document.querySelectorAll("img"));

        const gallery = links.map(link => link.getAttribute("href"))
        const arrayTitle = links.map(link =>link.getAttribute("title"));
        const arrayAlt = baliseImg.map(img => img.getAttribute("alt"));
  
            links.forEach(link => link.addEventListener("click", e => {
                e.preventDefault();
                console.log(e.currentTarget.firstElementChild.getAttribute("alt"))
                new Lightbox(
                    e.currentTarget.getAttribute('href'),
                    gallery,
                    e.currentTarget.getAttribute('title'),
                    arrayTitle,
                    e.currentTarget.firstElementChild.getAttribute("alt"),
                    arrayAlt
                    );
                
            }));

    }


    /**
     * 
     * @param {string} url URL de l'image 
     * @param {string[]} images chemins des images de la lightbox
     */

    constructor(url, images, title, arrayTitle, alt , arrayAlt) {
        this.element = this.buildDOM(url);
        this.images = images;
        this.title = title;
        this.arrayTitle = arrayTitle;
        this.alt = alt;
        this.arrayAlt = arrayAlt;
        this.loadMedia(url, title, alt);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        disableBodyScroll(this.element);
        document.addEventListener("keyup", this.onKeyUp);
    }


    /**
    * 
    * @param {string} url URL de l'image 
    */

    loadMedia(url, title, alt) {

       
       
        if(url.includes(".jpg")) {
            this.url = null
            const container = this.element.querySelector(".lightbox__container");
            container.innerHTML = "";
            const image = new Image(); /*document.createElement("image")*/
            this.url = url;
            container.appendChild(image);
            image.src = url;


            const text = document.createElement("p");
            this.title = title;
            container.appendChild(text);
            text.innerHTML = title;
            
            //ajout attribut alt
            image.alt = alt;
            console.log(alt)
        }    
        if (url.includes(".mp4")){
            const video = document.createElement("video");
            const container = this.element.querySelector(".lightbox__container");
            container.innerHTML = "";
         
            container.appendChild(video);
            this.url = url;
            video.controls = true;
            video.src = url;


            const textVideo = document.createElement("p");
            container.appendChild(textVideo);
            this.title = title;
            textVideo.innerHTML = title;
            
        
        }  
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
            let t = this.arrayTitle.findIndex(element => element === this.title);
            let a = this.arrayAlt.findIndex(attribute => attribute === this.alt)
            console.log(t)
            if (
                i === this.images.length - 1 
                && t === this.arrayTitle.length -1
                && a === this.arrayAlt.length -1
                ) {
                i = -1;
                t = -1;
                a = -1;
            }
            this.loadMedia(this.images[i + 1],this.arrayTitle[t + 1], this.arrayAlt[a + 1]);
            

        }

        prev(e){
            e.preventDefault();
            let i = this.images.findIndex(image => image === this.url);
            let t = this.arrayTitle.findIndex(element => element === this.title);
            let a = this.arrayAlt.findIndex(attribute => attribute === this.alt)
            if (i === 0 && t === 0 && a === 0) {
                i = this.images.length;
                t = this.arrayTitle.length;
                a = this.arrayAlt.length;
            }
            this.loadMedia(this.images[i - 1], this.arrayTitle[t - 1],this.arrayAlt[a - 1]);
        }

        /**
         * 
         * @param {string} url URL de l'image
         * @return {HTMLElement} 
         */

        buildDOM() {
            const dom = document.createElement('div');
            dom.classList.add('lightbox');
            dom.innerHTML = `<button
            class="lightbox__close">fermer</button>
            <button class="lightbox__next">suivant</button>
            <button class="lightbox__prev">précédent</button>
            <div class="lightbox__container"></div>`
            dom.querySelector(".lightbox__close").addEventListener("click", this.close.bind(this));
            dom.querySelector(".lightbox__next").addEventListener("click", this.next.bind(this));
            dom.querySelector(".lightbox__prev").addEventListener("click", this.prev.bind(this))
            return dom
        }
    }


   










