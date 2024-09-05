import { photographerTemplate } from '../templates/photographer.js';

async function getphotographers() {
  try {
    const response = await fetch('data/photographers.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photographers data:', error);
  }
}
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
        
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getphotographers();
    displayData(photographers);
}

init();


    