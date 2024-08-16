import MediaManager from '../models/MediaManager.js';
import WhishListCounter from '../models/WhishListCounter.js';
import { createImage, createVideo } from '../models/createmediacard.js';
import { sortByPopularity, sortByDate, sortByTitle } from '../models/sortMedia.js';

export default class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.mediaManager = new MediaManager(medias);
        this.whishListCounter = new WhishListCounter();
    }

    createPhotographerMedias(sortType = 'popularity') {
        const profilePageContent = document.querySelector(".main_content_medias");
        if (!profilePageContent) {
            throw new Error("Element with class 'main_content_medias' not found");
        }
        
        let sortedMedias;
        switch (sortType) {
            case 'date':
                sortedMedias = sortByDate(this.mediaManager.medias);
                break;
            case 'title':
                sortedMedias = sortByTitle(this.mediaManager.medias);
                break;
            case 'popularity':
            default:
                sortedMedias = sortByPopularity(this.mediaManager.medias);
                break;
        }

        const content = `
            <section class="gallery">
                ${sortedMedias.map(media => this.createMediaCard(media)).join("")}
            </section>
            <aside>
                <p class="photographer_Likes">
                    <span class="photographer_likes_count">${this.mediaManager.totalLikes}</span>
                    <span class="fas fa-heart" aria-hidden="true"></span>
                </p>
                <span>${this.photographer.price}€ / jour</span>
            </aside>
        `;

        profilePageContent.innerHTML = content;
        this.addEventListeners();
        return content;
    }

    createMediaCard(media) {
        const mediaContent = media.image
            ? createImage(media, this.photographer.name)
            : createVideo(media, this.photographer.name);

        return `
            <article class="gallery_card">
                <a href="#" data-media=${media.id} role="link">
                    <figure>${mediaContent}</figure>
                </a>
                <figcaption>
                    <h2>${media.title}</h2>
                    <div role="group" aria-label="Like button and number of likes">
                        <span class="nbLike" data-id="${media.id}">${media.likes}</span>
                        <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                            <span class="fas fa-heart" aria-hidden="true"></span>
                        </button>
                    </div>
                </figcaption>
            </article>
        `;
    }

    addEventListeners() {
        const sortButton = document.getElementById('sort-button');
        const sortMenu = document.getElementById('sort-menu');

        if (sortButton && sortMenu) {
            sortButton.addEventListener('click', () => {
                sortMenu.style.display = sortMenu.style.display === 'block' ? 'none' : 'block';
            });

            window.addEventListener('click', (event) => {
                if (!event.target.matches('#sort-button')) {
                    if (sortMenu.style.display === 'block') {
                        sortMenu.style.display = 'none';
                    }
                }
            });
        } else {
            console.warn("Elements for sort functionality not found!");
        }

        document.querySelectorAll(".btn_like").forEach(button => {
            button.addEventListener('click', (event) => {
                const mediaId = event.target.closest('button').dataset.id;
                this.mediaManager.toggleLike(mediaId);
            });
        });
    }
}
