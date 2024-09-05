/*import Image from '../models/Image.js'
import Video from '../models/Video.js'
/*
/*
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
*/
import {Image,Video} from '../models/media.js'
export default class mediasfactory {
    constructor(data) {
        if (data.image) {
            return new Image(data)
        } else if (data.video) {
            return new Video(data)
        } else {
            throw 'Unknown data type'
        }
    }
}