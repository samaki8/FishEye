export default class PhotographerMedias {
  constructor(photographer, medias) {
      this.photographer = photographer;
      this.medias = medias;
  };

  createPhotographerMedias() {
      const profilePageContent = document.querySelector(".main_content_medias");
      const content = `
          <section class="gallery">
              ${this.medias.map(media => {
          const mediaContent = media.image
              ? ` <img class="gallery_thumbnail" src="assets/images/${this.photographer.name}/${media.image}" alt="${media.alt}">`
              : ` <video class="gallery_thumbnail" aria-label="${media.alt}">
                      <source src="assets/images/${this.photographer.name}/${media.video}" type="video/mp4">
                  </video>`;
          return `
                  <article class="gallery_card">                           
                      <a href="#" data-media=${media.id} role="link" aria-label="View media large">
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

/*import MediaManager from '../models/MediaManager.js';
import { createImage, createVideo } from '../models/createmediacard.js';
import { sortByPopularity, sortByDate, sortByTitle } from '../models/sortMedia.js';

export default class PhotographerMedias {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.mediaManager = new MediaManager(medias);
    this.sortButton = document.getElementById('sort-button');
    this.sortMenu = document.getElementById('sort-menu');
    this.currentSortType = 'popularity';
    this.medias = medias;
  }

  createPhotographerMedias() {
    const profilePageContent = document.querySelector(".main_content_medias");
    if (!profilePageContent) {
      throw new Error("Element with class 'main_content_medias' not found");
    }

    const sortedMedias = this.sortMedias(this.currentSortType);
    const content = `
    <section class="gallery">
       ${sortedMedias.map(media => this.createMediaCard(media)).join("")}
</section\>
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
    
  }

  sortMedias(sortType) {
    switch (sortType) {
      case 'popularité':
        return sortByPopularity(this.medias);
      case 'date':
        return sortByDate(this.medias);
      case 'title':
        return sortByTitle(this.medias);
      default:
        return this.medias; // Retourne les médias d'origine si le type de tri n'est pas défini
    }
  }

  createMediaCard(media) {
    const mediaContent = media.image
      ? createImage(media, this.photographer.name)
      : createVideo(media, this.photographer.name);

    return `
      <article class="gallery_card">
        <a href="#" data-media="${media.id}" role="link">
          ${mediaContent}
        </a>
        <figcaption>
          <h2>${media.title}</h2>
          <div role="group" aria-label="Bouton J'aime et nombre de likes">
            <span class="nbLike" data-id="${media.id}">
              ${media.likes}
              <button class="btn_like" type="button" aria-label="J'aime" data-id="${media.id}">
                <span class="fas fa-heart" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        </figcaption>
      </article>
    `;
  }

  addEventListeners() {
    this.sortButton.addEventListener('click', () => {
      this.sortMenu.classList.toggle('active'); // Toggle active class
    });

    this.sortMenu.addEventListener('click', (event) => {
      const sortItem = event.target.closest('li'); // Target clicked list item
      if (sortItem) {
        const sortType = sortItem.dataset.sortType;
        this.currentSortType = sortType; // Update current sort state
        this.createPhotographerMedias(); // Rerender medias with new sort (cleaner separation)
        this.updateSortButtonLabel(sortType); // Update button label
      }
    });

    document.querySelectorAll(".btn_like").forEach(button => {
      button.addEventListener('click', (event) => {
        const mediaId = event.target.closest('button').dataset.id;
        this.mediaManager.toggleLike(mediaId);
      });
    });
  }


  updateSortButtonLabel(sortType) {
    this.sortButton.textContent = sortType.charAt(0).toUpperCase() + sortType.slice(1);
  }
} 

/*import MediaManager from '../models/MediaManager.js';
import WhishListCounter from '../models/WhishListCounter.js';
import { createImage, createVideo } from '../models/createmediacard.js';
import { sortByPopularity, sortByDate, sortByTitle } from '../models/sortMedia.js';

export default class PhotographerMedias {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.mediaManager = new MediaManager(medias);
    this.sortButton = document.getElementById('sort-button');
    this.sortMenu = document.getElementById('sort-menu');
    this.currentSortType = 'popularity';
  }

  createPhotographerMedias() {
    const profilePageContent = document.querySelector(".main_content_medias");
    if (!profilePageContent) {
      throw new Error("Element with class 'main_content_medias' not found");
    }

    const sortedMedias = this.sortMedias(this.currentSortType);
    
  }
    const content = `
      <section class="gallery">
        <span class="math-inline">\{sortedMedias\.map\(media \=\> this\.createMediaCard\(media\)\)\.join\(""\)\}
</section\>
<aside\>
<p class\="photographer\_Likes"\>
<span class\="photographer\_likes\_count"\></span>{this.mediaManager.totalLikes}</span>
          <span class="fas fa-heart" aria-hidden="true"></span>
        </p>
        <span>${this.photographer.price}€ / jour</span>
      </aside>
    `;

    profilePageContent.innerHTML = content;

    this.addEventListeners();
  }
  sortMedias(sortType) {
    switch (sortType) {
      case 'popularity':
        return sortByPopularity(this.medias);
      case 'date':
        return sortByDate(this.medias);
      case 'title':
        return sortByTitle(this.medias);
      default:
        return this.medias; // Return original medias if sortType is not defined
    }
  }
 
  

  createMediaCard(media) {
    const mediaContent = media.image
      ? createImage(media, this.photographer.name)
      : createVideo(media, this.photographer.name);
  
    return `
      <article class="gallery_card">
        <a href="#" data-media="${media.id}" role="link">
          ${mediaContent}
        </a>
        <figcaption>
          <h2>${media.title}</h2>
          <div role="group" aria-label="Bouton J'aime et nombre de likes">
            <span class="nbLike" data-id="${media.id}">
              ${media.likes}
              <button class="btn_like" type="button" aria-label="J'aime" data-id="${media.id}">
                <span class="fas fa-heart" aria-hidden="true"></span>
              </button>
            </span>
          </div>
        </figcaption>
      </article>
    `;
  }
  

AddEventListeners() {
    this.sortButton.addEventListener('click', () => {
      this.sortMenu.classList.toggle('active'); // Toggle active class
    });

    this.sortMenu.addEventListener('click', (event) => {
      const sortItem = event.target.closest('li'); // Target clicked list item
      document.querySelector(".fa-chevron-up").classList.toggle("rotate");
      if (sortItem) {
        const sortType = sortItem.dataset.sortType;
        this.currentSortType = sortType; // Update current sort state
        this.createPhotographerMedias(); // Rerender medias with new sort (cleaner separation)
        this.updateSortButtonLabel(sortType); // Update button label
      }
    });

    document.querySelectorAll(".btn_like").forEach(button => {
      button.addEventListener('click', (event) => {
        const mediaId = event.target.closest('button').dataset.id;
        this.mediaManager.toggleLike(mediaId);
      });
    });
  }


  updateSortButtonLabel(sortType) {
    const sortLabel = this.sortButton.textContent.trim();
    this.sortButton.textContent = sortType.charAt(0).toUpperCase() + sort
  }
}  
*/