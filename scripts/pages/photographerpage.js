import Api from "../api/api.js";
import photographerheader from "../templates/photographerheader.js";
import photographermedias from "../templates/photographermedias.js";
import Photographer from "../models/photographer.js";
import mediasfactory from "../factories/mediasfactory.js";
import { displayTotalLikes } from "../models/likes.js";
import { openCloseFormContact, validateForm } from "../utils/form.js";
import { openCloseFilterMenu, displayMediaWithFilter } from "../utils/filter.js";
import { displayLightbox } from "../utils/lightbox.js";

const photographersApi = new Api("./data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");

export const getPhotographerById = async () => {
    const { photographers, media } = await photographersApi.get();
    const photographer = photographers
        .map(photographer => new Photographer(photographer))
        .find(photographer => photographer.id == photographerId);
    const medias = media
        .map(media => new mediasfactory(media))
        .filter(media => media.photographerId == photographerId);
    return { photographer, medias };
};

const displayProfilePage = async () => {
    const { photographer, medias } = await getPhotographerById();
    const headerTemplate = new PhotographerHeader(photographer);
    headerTemplate.createPhotographerHeader();
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();

    displayTotalLikes();
    openCloseFormContact();
    validateForm();
    openCloseFilterMenu();
    displayMediaWithFilter(mediasTemplate)
    displayLightbox(mediasTemplate);
};

displayProfilePage();
/*import Api from "../api/Api.js";
import PhotographerHeader from "../templates/PhotographerHeader.js";
import PhotographerMedias from "../templates/PhotographerMedias.js";
import Photographer from "../models/Photographer.js";
import MediasFactory from "../Factories/MediasFactory.js";


const photographersApi = new Api("./data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");

export const getPhotographerById = async () => {
    const { photographers, media } = await photographersApi.get();
    const photographer = photographers
        .map(photographer => new Photographer(photographer))
        .find(photographer => photographer.id == photographerId);
    const medias = media
        .map(media => new MediasFactory(media))
        .filter(media => media.photographerId == photographerId);
    return { photographer, medias };
};

const displayProfilePage = async () => {
    const { photographer, medias } = await getPhotographerById();
    const headerTemplate = new PhotographerHeader(photographer);
    headerTemplate.createPhotographerHeader();
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    window.photographerMedias = mediasTemplate; // Rendre l'instance globale
    mediasTemplate.createPhotographerMedias();
};


displayProfilePage();

*/
/*import Api from "../api/Api.js";
import PhotographerHeader from "../templates/PhotographerHeader.js";
import PhotographerMedias from "../templates/PhotographerMedias.js";
import Photographer from "../models/Photographer.js";
import MediasFactory from "../Factories/MediasFactory.js";


const photographersApi = new Api("./data/photographers.json");
const photographerId = new URLSearchParams(window.location.search).get("id");


export const getPhotographerById = async () => {
    const { photographers, media } = await photographersApi.get();
    const photographer = photographers
        .map(photographer => new Photographer(photographer))
        .find(photographer => photographer.id == photographerId);
    const medias = media
        .map(media => new MediasFactory(media))
        .filter(media => media.photographerId == photographerId);
    return { photographer, medias };
};

const displayProfilePage = async () => {
    const { photographer, medias } = await getPhotographerById();
    const headerTemplate = new PhotographerHeader(photographer);
    headerTemplate.createPhotographerHeader();
    const mediasTemplate = new PhotographerMedias(photographer, medias);
    mediasTemplate.createPhotographerMedias();
   
};

displayProfilePage();*/