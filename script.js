const apiKey = "8HQKBK7UsWzIu4iJ2F390i5xa2m5t-iKp23UnduWpI8";
const images = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photos = [];
let page = 1;
let allImagesLoaded = false;
let loadedImages = 0;

function imageLoaded() {
    console.log('image loaded');
    loadedImages++;

    if (loadedImages === photos.length) {
        allImagesLoaded = true;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    photos.forEach(photo => {
        const { alt_description, links, urls } = photo;

        const linkElement = document.createElement('a');
        const image = document.createElement('img');

        setAttributes(linkElement, { href: links.html });
        setAttributes(image, {
            src: urls.regular,
            alt: alt_description
        });

        linkElement.appendChild(image);
        images.appendChild(linkElement);

        image.addEventListener('load', imageLoaded);
    });
}

async function getPhotos() {
    const apiUrl = `https://api.unsplash.com/photos/?client_id=${apiKey}&page=${page}`;

    try {
        const response = await fetch(apiUrl);
        photos = await response.json();

        displayPhotos();
        page++;
    } catch (e) {
        console.log('error', e);
    }
};


window.addEventListener('scroll', () => {
    if (document.body.offsetHeight - window.scrollY <= window.innerHeight + 1000 && allImagesLoaded) {
        loader.hidden = false;
        allImagesLoaded = false;
        loadedImages = 0;
        getPhotos();
    }
});

getPhotos();