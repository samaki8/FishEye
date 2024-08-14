export default class MediaManager {
    constructor(medias) {
        this.medias = medias;
        this.totalLikes = this.medias.reduce((sum, media) => sum + media.likes, 0);
    }

    toggleLike(mediaId) {
        const media = this.medias.find(media => media.id == mediaId);
        if (media) {
            if (media.liked) {
                media.likes -= 1;
                this.totalLikes -= 1;
                media.liked = false;
            } else {
                media.likes += 1;
                this.totalLikes += 1;
                media.liked = true;
            }
            document.querySelector(`.nbLike[data-id="${mediaId}"]`).textContent = media.likes;
            document.querySelector(".photographer_likes_count").textContent = this.totalLikes;
        }
    }
}
