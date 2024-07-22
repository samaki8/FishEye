//import photographerTemplate from "../templates/photographer.js";
fetch('./data/photographers.json')
    .then((resp) => resp.json())
    .then(function(data) {
        const photographersSection = document.querySelector('.photographer_section');
        function photographerTemplate(data) {
            const { name, portrait } = data;
        
            const picture = `../assets/photographers/${portrait}`;
        
            function getUserCardDOM() {
                const article = document.createElement( 'article' );
                const img = document.createElement( 'img' );
                img.setAttribute("src", picture)
                const h2 = document.createElement( 'h2' );
                h2.textContent = name;
                article.appendChild(img);
                article.appendChild(h2);
                return (article);
            }
            return { name, picture, getUserCardDOM }
        }    
    ;
        // Parcours des photographes et création des éléments DOM
        data.photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    })
    .catch((error) => {
        
        console.error('Erreur lors de la récupération des données :', error);
    });

    