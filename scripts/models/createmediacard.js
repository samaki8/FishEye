// createmediacard.js
export function createImage(media, photographerName) {
    return `<img class="gallery_thumbnail" src="./assets/images/${photographerName}/${media.image}" alt="${media.title}">`;
}

export function createVideo(media, photographerName) {
    return `
        <video class="gallery_thumbnail" aria-label="${media.title}">
            <source src="./assets/images/${photographerName}/${media.video}" type="video/mp4">
        </video>`;
}