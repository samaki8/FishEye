// Récupère les données depuis photographes.json
fetch('photographes.json')
    .then((resp) => resp.json())
    .then(function(data) {
        const photographesSection = document.querySelector('.photographes');

        // Parcours des photographes et création des éléments DOM
        data.photographers.forEach((photographe) => {
            const photographeCard = document.createElement('div');
            photographeCard.classList.add('photographe-card');

            // Créez des éléments pour chaque propriété du photographe (nom, ville, etc.)
            const nameElement = document.createElement('h2');
            nameElement.textContent = photographe.name;
            photographeCard.appendChild(nameElement);

            const cityElement = document.createElement('p');
            cityElement.textContent = `Ville : ${photographe.city}`;
            photographeCard.appendChild(cityElement);

            // Ajoutez d'autres propriétés (tagline, prix, etc.) de la même manière

            photographesSection.appendChild(photographeCard);
        });
    })
    .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error);
    });

    //import {photographers} from "./data/photographer.js";


//Récupération des photographers eventuellement stockées dans le localStorage
/*let photographers = window.localStorage.getItem("photographers");

if (photographers === null) {
    // Récupération des photographers depuis l'API
    const reponse = await fetch ("http://localhost:8081/data/photographers/") ;
    photographers = await reponse.json();
    // Transformation des photographers en JSON
    const photographersData = JSON.stringify(photographers);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("photographers", photographersData);
}else{
    photographers = JSON.parse(photographers);
}

*/
/*
const reponse =  await ('./data/photographers.json');
const photographers = await reponse.json();  

async function getPhotographers() {
    // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
    // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
    for (let i = 0; i < photographers.length; i++) {
        const article = photographers[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const photographerModel = photographerTemplate(article);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);

    }

    // et bien retourner le tableau photographers seulement une fois récupéré
    return ({
        photographers: []
    })
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
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();


*/

fetch('./data/photographers.json')
.then((resp) => resp.json())
.then(function(data) {
    const photographesSection = document.querySelector('.photographes');
async function getPhotographers() {
const response = await fetch('./data/photographers.json');
photographers = await response.json();

// Assurez-vous que photographerTemplate et photographersSection sont correctement définis dans votre code

for (let i = 0; i < photographers.length; i++) {
    const photographer = photographers[i];
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
}

return { photographers }; // Retourne les données des photographes une fois récupérées
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
const { photographers } = await getPhotographers();
displayData(photographers);
}

init();





















async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
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
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();

    async function getPhotographers() {
        const response = await fetch('./data/photographers.json');
        const photographers = await response.json();
    
        // Assurez-vous que photographerTemplate et photographersSection sont correctement définis dans votre code
    
        for (let i = 0; i < photographers.length; i++) {
            const article = photographers[i];
            const photographerModel = photographerTemplate(article);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        }
    
        return { photographers }; // Retourne les données des photographes une fois récupérées
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
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
    
