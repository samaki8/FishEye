/*
export default class Photographer {
    constructor(data) {
        const {
            name, id, city, country, tagline, price, portrait,
        } = data
        this._name = name
        this._id = id
        this._city = city
        this._country = country
        this._tagline = tagline
        this._price = price
        this._portrait = portrait
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get location() {
        return `${this._city}, ${this._country}`
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get picture() {
        return `assets/Photographers/${this._portrait}`
    }
}
*/
export default class Photographer {
    constructor(data) {
        this.name = data.name;
        this.id = data.id;
        this.city = data.city;
        this.country = data.country;
        this.tagline = data.tagline;
        this.price = data.price;
        this.portrait = data.portrait;
    }
}