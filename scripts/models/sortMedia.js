// sortMedia.js
export function sortByPopularity(medias) {
    return medias.sort((a, b) => b.likes - a.likes);
}

export function sortByDate(medias) {
    return medias.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function sortByTitle(medias) {
    return medias.sort((a, b) => a.title.localeCompare(b.title));
}
