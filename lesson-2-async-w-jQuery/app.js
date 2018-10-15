/* eslint-env jquery */

(function() {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    $.ajax({
        url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
        headers: {
            Authorization: 'Client-ID e68ff33906404ce5936e246e05a7b0bc672daaa2c35af2db6bc8c82086ef269a'
        }
    }).done(addImage);

    $.ajax({
        url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=a6f1ab663b214e4aa324de6af39fa6be`
    }).done(addArticles);
});

function addImage(images) {
    const firstImage = images.results[0];

    responseContainer.insertAdjacentHTML('afterbegin', `<figure>
            <img src="${firstImage.urls.small}" alt="${searchedForText}">
            <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
        </figure>`);
}

function addArticles(data) {
    const articlesInHTML = data.response.docs.map(article => `<li>
            <h2><a href="${article.web_url}">${article.headline.main}</a><h2>
            <p>${article.snippet}</p>
        </li>`).join('');

    responseContainer.insertAdjacentHTML('beforeend', `<ul>${articlesInHTML}</ul>`);
}
})();