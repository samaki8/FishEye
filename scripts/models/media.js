export class Media {
    constructor(data) {
        

        this.id = data.id;
        this.photographerId = data.photographerId
        this.title = data.title
        this.likes = data.likes
        this.date = data.date
        this.price = data.price
    }
}

export  class Video extends Media {
    constructor(data) {
        super(data);
        this.video = data.video;
    }
};
export class Image extends Media {
    constructor(data) {
        super(data);
        this.image = data.image;
    }
};

/*
    get id() {
        return this._id
    }

    get photographerId() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }
}    
/*
    photographerFolder(name) {
        if (name) {
            let folder = name.split(' ')[0]
            if (folder.includes('-')) {
                folder = folder.replace('-', '')
            }
            return folder
        }
        return false
    }

    getSource(photographerName, media) {
        if (photographerName) {
            const folder = this.photographerFolder(photographerName)
            return `/assets/images/${folder}/${media}`
        }
        return false
    }
}*/
/*
get medias() {
    return `assets/images/Photographers/${this.photographer.name}/${this.medias}`
}
*/
// Image Media

/*
export class ImageM extends Media {
    constructor(data) {
        super(data)
        this._image = data.image
    }
}

/*
    // get image link
    getImage(photographerName) {
        return this.getSource(photographerName, this._image)
    }
}
*/
// Video Media
/*
export class VideoM extends Media {
    constructor(data) {
        super(data)
        this._video = data.video
    }
}
/*
    // get video link
    getVideo(photographerName) {
        return this.getSource(photographerName, this._video)
    }
}*/