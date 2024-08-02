import PhotographerCard from '../templates/PhotographerCard.js'

async function fetchPhotographers() {
    try {
        const response = await fetch('data/photographers.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.photographers; // Retourne le tableau de photographes
    } catch (error) {
        console.error('Error fetching photographers:', error);
    }
}



function createPhotographerProfile(data) {
    const { name, city, country, tagline, portrait, altname } = data;
    const picture = `assets/photographers/${portrait}`;

    const img = createImage(picture, altname);
    const photographHeader = document.querySelector('.photograph-header');


    if (photographHeader) {
        const imgcontainer = createCardContainer([img]);
        photographHeader.appendChild(imgcontainer);

        const h2 = createHeading('h2', name);
        const h3 = createHeading('h3', `${city}, ${country}`);
        const tag = createParagraph(tagline);
        photographHeader.append(h2, h3, tag);
    } else {
        console.error('Element with class .photograph-header not found');
    }

    const mediaContainer = document.querySelector('.media-container');
    if (mediaContainer) {
        data.media.forEach(mediaData => {
            const media = mediaData.type === 'image' ? new ImageMedia(mediaData) : new VideoMedia(mediaData);
            const mediaImg = createImage(media.url, media.title);
            mediaContainer.appendChild(mediaImg);
        });
    } else {
        console.error('Element with class .media-container not found');
    }

}

function createImage(src, alt) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
}

function createCardContainer(children) {
    const container = document.createElement('div');
    container.className = 'photographer_card';
    children.forEach(child => container.appendChild(child));
    return container;
}

function createHeading(level, text) {
    const heading = document.createElement(level);
    heading.textContent = text;
    return heading;
}

function createParagraph(text) {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
}
// recuperation id
function getPhotographerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}


document.addEventListener('DOMContentLoaded', async () => {
    const photographerId = getPhotographerIdFromUrl();
    if (photographerId) {
        const photographers = await fetchPhotographers();
        if (Array.isArray(photographers)) {
            const photographer = photographers.find(p => p.id == photographerId);
            if (photographer) {
                createPhotographerProfile(photographer);
            } else {
                console.error('Photographer not found');
            }
        } else {
            console.error('Photographers data is not an array');
        }
    } else {
        console.error('No photographer ID found in URL');
    }
});
