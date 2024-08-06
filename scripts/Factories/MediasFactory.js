import * as Media from '../models/media.js'

export default class MediasFactory {
    constructor(media) {
        if (media) {
            // Vérifiez le type Img ou Video
            const med = media.image ? new Media.ImageM(media) : new Media.VideoM(media);
            med.type = media.image ? 'ImageM' : 'VideoM';
            return med;
        }
        // En cas d'erreur
        throw new Error('Pas de média');
    }
}
