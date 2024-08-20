export const displayLightbox = medias => {

    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    const btnClose = document.querySelector('.btn_close_lightbox');
    const btnPrevious = document.querySelector('.btn_previous');
    const btnNext = document.querySelector('.btn_next');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'));

    const photographer = medias.photographer;
    const mediasList = medias.medias;
    let currentIndex = 0; 

    mediaProvider.forEach(media => {
        media.addEventListener('click', () => {
            const mediaId = media.dataset.media;
            const mediaIndex = mediasList.findIndex(media => media.id == mediaId);
            currentIndex = mediaIndex;
            lightboxWrapper.style.display = 'flex';
            btnClose.focus();
            lightboxTemplate();
        });
    });
        
    const lightboxTemplate = () => {
        const currentMedia = mediasList[currentIndex];
        
        lightboxMedia.innerHTML = `
            ${currentMedia.image ? `
            <img src="./assets/images/${photographer.name}/${currentMedia.image}" alt="${currentMedia.alt}">` : 
            `<video controls aria-label="${currentMedia.alt}"><source src="./assets/images/${photographer.name}/${currentMedia.video}" type="video/mp4"></video>`}

            <figcaption>${currentMedia.title}</figcaption>
        `;
    };
    
    const closeLightbox = () => {
        lightboxWrapper.style.display = 'none';
        lightboxMedia.innerHTML = '';
    };

    const nextMedia = () => {
        currentIndex++;
        if (currentIndex > mediasList.length - 1) currentIndex = 0;
        lightboxTemplate();
        showActiveBtn(btnNext);
    };

    const previousMedia = () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = mediasList.length - 1;
        lightboxTemplate();
        showActiveBtn(btnPrevious);
    };

    const showActiveBtn = btn => {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 100);
    };        
        
    document.addEventListener('keyup', e => {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousMedia();
                break;
            case 'ArrowRight':
                nextMedia();
                break;
        };
    });

    btnPrevious.addEventListener('click', () => previousMedia());
    btnNext.addEventListener('click', () => nextMedia());
    btnClose.addEventListener('click', () => closeLightbox());
};