export default class whishListCounter {
    constructor() {
        this._count = 0;
        this._$wishCount = document.querySelector('.wish-count');
        //if (!this._$wishCount) {
          //  throw new Error("Element with class 'wish-count' not found");
        //}
    }

    update(action) {
        if (action === 'INC') {
            this._count += 1;
        } else if (action === 'DEC') {
            this._count -= 1;
        } else {
            throw new Error("Unknown action");
        }

        this._$wishCount.innerHTML = this._count;
    }
}
