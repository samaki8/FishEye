import { sortByPopularity, sortByDate, sortByTitle } from '../models/sortMedia.js';

export default class photographermedias {
  constructor(photographer, medias) {
    this.photographer = photographer;
    this.medias = medias;   

    this.sortButton = document.getElementById('sort-button');
    this.sortMenu = document.getElementById('sort-menu');
  }

  createPhotographerMedias() {
    // ... (your code to create media cards)

    this.addEventListeners();
  }

  addEventListeners() {
    this.sortButton.addEventListener('click', () => {
      this.sortMenu.classList.toggle('active'); // Toggle active class
    });

    this.sortMenu.addEventListener('click', (event) => {
      const sortItem = event.target.closest('li'); // Target clicked list item
      if (sortItem) {
        const sortType = sortItem.dataset.sortType;
        this.sortMedias(sortType);
        this.updateSortButtonLabel(sortType); // Update button label
        this.sortMenu.classList.remove('active'); // Close menu
      }
    });
  }

  sortMedias(sortType) {
    switch (sortType) {
      case 'popularity':
        this.medias = sortByPopularity(this.medias);
        break;
      case 'date':
        this.medias = sortByDate(this.medias);
        break;
      case 'title':
        this.medias = sortByTitle(this.medias);
        break;
    }

    // ... (your code to re-render media cards based on sorted data)
  }

  updateSortButtonLabel(sortType) {
    const sortLabel = this.sortButton.textContent.trim(); // Get current label
    this.sortButton.textContent = sortType.charAt(0).toUpperCase() + sortLabel.slice(1);
  }
}