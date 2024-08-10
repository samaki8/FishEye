class WhishListCounter {
    constructor() {
        this._count = 0;
        this._$wishCount = document.querySelector('.wish-count');
        //if (!this._$wishCount) {
          //  throw new Error("Element with class 'wish-count' not found");
        //}
    }

    update(action) {
        if (action === 'INC') {
            this._count += 1;
        } else if (action === 'DEC') {
            this._count -= 1;
        } else {
            throw new Error("Unknown action");
        }

        this._$wishCount.innerHTML = this._count;
    }
}

class MediaManager {
    constructor(medias) {
        this.medias = medias;
        this.totalLikes = this.medias.reduce((sum, media) => sum + media.likes, 0);
    }

    toggleLike(mediaId) {
        const media = this.medias.find(media => media.id == mediaId);
        if (media) {
            if (media.liked) {
                media.likes -= 1;
                this.totalLikes -= 1;
                media.liked = false;
            } else {
                media.likes += 1;
                this.totalLikes += 1;
                media.liked = true;
            }
            document.querySelector(`.nbLike[data-id="${mediaId}"]`).textContent = media.likes;
            document.querySelector(".photographer_likes_count").textContent = this.totalLikes;
        }
    }
}

export default class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.mediaManager = new MediaManager(medias);
        this.wishListCounter = new WhishListCounter();
    }

    createPhotographerMedias() {
        const profilePageContent = document.querySelector(".main_content_medias");
        if (!profilePageContent) {
            throw new Error("Element with class 'main_content_medias' not found");
        }

        const content = `
            <section class="gallery">
                ${this.mediaManager.medias.map(media => this.createMediaCard(media)).join("")}
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
            ? this.createImage(media)
            : this.createVideo(media);

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

    createImage(media) {
        return `<img class="gallery_thumbnail" src="./assets/images/${this.photographer.name}/${media.image}" alt="${media.title}">`;
    }

    createVideo(media) {
        return `
            <video class="gallery_thumbnail" aria-label="${media.title}">
                <source src="./assets/images/${this.photographer.name}/${media.video}" type="video/mp4">
            </video>`;
    }

    addEventListeners() {
        document.querySelectorAll(".btn_like").forEach(button => {
            button.addEventListener("click", (event) => {
                const mediaId = event.currentTarget.getAttribute("data-id");
                this.mediaManager.toggleLike(mediaId);
                button.classList.toggle('liked');
            });
        });

        document.querySelectorAll(".btn_wish").forEach(button => {
            button.addEventListener("click", () => {
                this.wishListCounter.update('INC');
            });
        });
    }
}


/*
export default class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
         // WishLib Pub/sub
         //this.WishlistSubject = new WishlistSubject()
         //this.WhishListCounter = new WhishListCounter()
 
         //this.WishlistSubject.subscribe(this.WhishListCounter)
         
    };

    createPhotographerMedias() {
        const profilePageContent = document.querySelector(".main_content_medias");
        const content = `
            <section class="gallery">
                ${this.medias.map(media => {
            const mediaContent = media.image
                ? ` <img class="gallery_thumbnail" src="./assets/images/${this.photographer.name}/${media.image}" alt="${media.title}">`
                : ` <video class="gallery_thumbnail" aria-label="${media.title}">
                        <source src="./assets/images/${this.photographer.name}/${media.video}" type="video/mp4">
                    </video>`;
            return `
                    <article class="gallery_card">                           
                        <a href="#" data-media=${media.id} role="link" >
                            <figure>${mediaContent}</figure>
                        </a>
                        <figcaption>
                            <h2>${media.title}</h2>
                                <div role="group" aria-label="Like button and number of likes">
                                    <span class="nbLike">${media.likes}</span> 
                                    <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                                        <span class="fas fa-heart" aria-hidden="true"></span>
                                    </button> 
                                </div>
                        </figcaption>
                    </article>
                `;
        }).join("")}
            </section >
            <aside>
                <p class="photographer_Likes">
                    <span class="photographer_likes_count"></span>
                    <span class="fas fa-heart" aria-hidden="true"></span>
                </p>
                <span>${this.photographer.price}€ / jour</span>
            </aside>
        `;

        profilePageContent.innerHTML = content;
        return content;
    };
};
*/
/*
export default class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
        
    }

    createPhotographerMedias() {
        const profilePageContent = document.querySelector(".main_content_medias");
        const content = `
            <section class="gallery">
                ${this.medias.map(media => this.createMediaCard(media)).join("")}
            </section>
            <aside>
                <p class="photographer_Likes">
                    <span class="photographer_likes_count"></span>
                    <span class="fas fa-heart" aria-hidden="true"></span>
                </p>
                <span>${this.photographer.price}€ / jour</span>
            </aside>
        `;

        profilePageContent.innerHTML = content;
        return content;
    }

    createMediaCard(media) {
        const mediaContent = media.image
            ? this.createImage(media)
            : this.createVideo(media);

        return `
            <article class="gallery_card">
                <a href="#" data-media=${media.id} role="link">
                    <figure>${mediaContent}</figure>
                </a>
                <figcaption>
                    <h2>${media.title}</h2>
                    <div role="group" aria-label="Like button and number of likes">
                        <span class="nbLike">${media.likes}</span>
                        <button class="btn_like" type="button" aria-label="Like" data-id="${media.id}">
                            <span class="fas fa-heart" aria-hidden="true"></span>
                        </button>
                    </div>
                </figcaption>
            </article>
        `;
    }

    createImage(media) {
        return `<img class="gallery_thumbnail" src="./assets/images/${this.photographer.name}/${media.image}" alt="${media.title}">`;
    }

    createVideo(media) {
        return `
            <video class="gallery_thumbnail" aria-label="${media.title}">
                <source src="./assets/images/${this.photographer.name}/${media.video}" type="video/mp4">
            </video>`;
    }
}
*/
/*
export default class PhotographerMedias {
    constructor(photographer, medias) {
        this.photographer = photographer;
        this.medias = medias;
        this.totalLikes = this.medias.reduce((sum, media) => sum + media.likes, 0);
    }

    createPhotographerMedias() {
        const profilePageContent = document.querySelector(".main_content_medias");
        const content = `
            <section class="gallery">
                ${this.medias.map(media => this.createMediaCard(media)).join("")}
            </section>
            <aside>
                <p class="photographer_Likes">
                    <span class="photographer_likes_count"></span>
                    <span class="fas fa-heart" aria-hidden="true"></span>
                </p>
                <span>${this.photographer.price}€ / jour</span>
            </aside>
        `;

        profilePageContent.innerHTML = content;
        this.addLikeEventListeners();
        return content;
    }

    createMediaCard(media) {
        const mediaContent = media.image
            ? this.createImage(media)
            : this.createVideo(media);

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

    createImage(media) {
        return `<img class="gallery_thumbnail" src="./assets/images/${this.photographer.name}/${media.image}" alt="${media.title}">`;
    }

    createVideo(media) {
        return `
            <video class="gallery_thumbnail" aria-label="${media.title}">
                <source src="./assets/images/${this.photographer.name}/${media.video}" type="video/mp4">
            </video>`;
    }

    addLikeEventListeners() {
        const likeButtons = document.querySelectorAll(".btn_like");
        likeButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const mediaId = event.currentTarget.getAttribute("data-id");
                this.incrementLike(mediaId);
            });
        });
    }

    incrementLike(mediaId) {
        const media = this.medias.find(media => media.id == mediaId);
        if (media) {
            media.likes += 1;
            this.totalLikes += 1;
            document.querySelector(`.nbLike[data-id="${mediaId}"]`).textContent = media.likes;
            document.querySelector(".photographer_likes_count").textContent = this.totalLikes;
        }
    }
}*/
