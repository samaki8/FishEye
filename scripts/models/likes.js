class displayTotalLike {
    constructor() {
        this._count = 0
        this.likesElement = document.querySelector('.photographer_likes_count')
    }

    update(action) {
        if (action === 'INC') {
            this._count += 1
        } else if (action === 'DEC') {
            this._count -= 1
        } else {
            throw "Unknow action"
        }

        this.likesElement.innerHTML = this._count
    }
}

class hearts {
    constructor() {
        this._observers = []
    }

    subscribe(observer) {
        this._observers.push(observer)
    }

    unsubscribe(observer) {
        this._observers = this._observers.filter(obs => obs !== observer)
    }

    fire(action) {
        this._observers.forEach(observer => observer.update(action))
    }
}

