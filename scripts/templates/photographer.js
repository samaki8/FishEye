export function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `./assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const pTagline = document.createElement('p');
        const pPrice = document.createElement('p');

        h2.textContent = name;
        h3.textContent = `${city}, ${country}`;
        pTagline.textContent = tagline;
        pPrice.textContent = `${price} €/jour`;

        // Créer un lien avec l'ID du photographe dans l'URL
        const link = document.createElement('a');
        link.href = `photographer.html?id=${id}`;
        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(link);
        article.appendChild(h3);
        article.appendChild(pTagline);
        article.appendChild(pPrice);

        return article;
    }

    return { name, picture, city, getUserCardDOM };
}

