import fetchTransformedImages from "./fetchTransformedImages.js";
import createModal from "./modal.js";

/**
 * Display transformed images on the web page.
 * 
 * This function fetches transformed image data, creates appropriate DOM elements,
 * and then appends them to the 'transformedImagesContainer' on the web page.
 *
 * @async
 * @function
 * @throws {Error} Logs an error if there is an issue displaying images.
 * 
 * @example
 * await displayTransformedImages();
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement |MDN createElement}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild |MDN appendChild}
 */
export default async function displayTransformedImages() {
    // Get the container element where the transformed images will be displayed.
    const transformedImagesContainer = document.getElementById('transformedImagesContainer');

    fetchTransformedImages()
        .then((data) => {
            // Iterate over each image data and create a corresponding DOM element.
            data.forEach((image) => {
                const transformedImageElement = createTransformedImageCard(image);
                console.log("Image:", image);
                transformedImagesContainer.appendChild(transformedImageElement);
            });
        })
        .catch(error => {
            console.error("Error displaying transformed images. Check if the data structure matches expectations or if there's any issue with the DOM:", error);
        });

    /**
     * Create a card element for a transformed image.
     * 
     * This helper function generates a DOM structure representing an image card,
     * which includes the image itself and associated metadata like name.
     * 
     * @param {Object} image - The image data object.
     * @param {string} image.name - The name of the image.
     * @param {Object} image.image - The image details.
     * @param {Object} image.image.asset - The asset details of the image.
     * @param {string} image.image.asset.url - The URL of the image.
     * 
     * @returns {HTMLElement} The card DOM element.
     */
    function createTransformedImageCard(image) {
        const card = document.createElement('div');
        card.classList.add('card');

        const imageLink = document.createElement('a');

        const imgElement = document.createElement('img');
        imgElement.src = image.image.asset.url;
        imgElement.alt = image.name;

        imageLink.appendChild(imgElement);
        card.appendChild(imageLink);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card__content');

        const titleElement = document.createElement('h3');
        titleElement.classList.add('card__title');
        titleElement.textContent = image.name;
        cardContent.appendChild(titleElement);

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('card__description');
        cardContent.appendChild(descriptionElement);

        const description = image.imageStyle?.description || 'No description available';
        // descriptionElement.textContent = description;

        card.appendChild(cardContent);

        const modal = createModal(description);
        card.appendChild(modal);

        // Add event listener to show modal on hover
        card.addEventListener('mouseenter', () => {
            modal.classList.add('show');
        });

        // Add event listener to hide modal on mouseleave
        card.addEventListener('mouseleave', () => {
            modal.classList.remove('show');
        });

        return card;
    }
};
