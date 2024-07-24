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
        photographHeader.innerHTML = ''; // Clear previous content
        const imgcontainer = createCardContainer([img]);
        photographHeader.appendChild(imgcontainer);
    
        const h2 = createHeading('h2', name);
        const h3 = createHeading('h3', `${city}, ${country}`);
        const tag = createParagraph(tagline);
        photographHeader.append(h2, h3, tag);
    } else {
        console.error('Element with class .photograph-header not found');
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
    container.className = 'card-container';
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
/*
// Example usage
document.addEventListener('DOMContentLoaded', async () => {
    const photographers = await fetchPhotographers();
    const selectedPhotographer = photographers.find(p => p.id === 1); // Replace with actual selection logic
    if (selectedPhotographer) {
        createPhotographerProfile(selectedPhotographer);
    }
});

/*
async function getPhotographer() {
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


function createPhotographerProfile(data) {
    const { name, city, country, tagline, portrait, altname,id } = data;
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
}
*/