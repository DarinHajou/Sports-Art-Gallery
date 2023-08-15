/**
 * Creates a modal DOM element with the provided description.
 * The modal contains a link which, when clicked, opens in a new tab.
 *
 * @param {string} description - The text description for the modal. Defaults to a placeholder if not provided.
 * @returns {HTMLElement} - The modal DOM element.
 */
// Some of this modal implementation was inspired by the "easiest way to make a popup modal" 
// by Kevin Powell and assistance from ChatGPT by OpenAI.
// URL: https://www.youtube.com/watch?v=TAB_v6yBXIE

export default function createModal(description, athleteId) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const descriptionLink = document.createElement('a');
    if (athleteId) {  // Check if athleteId exists before setting the href  ***here the change
        descriptionLink.href = `./athlete-bio-page/index.html?id=${athleteId}`;
    } else {
        descriptionLink.href = '#';  // Set a fallback href if no athleteId
    }
    descriptionLink.target = '_blank';
    descriptionLink.style.textDecoration = 'none';

    const descriptionText = document.createElement('p');
    descriptionText.textContent = description || 'Image description or additional information';

    descriptionLink.appendChild(descriptionText);
    modalContent.appendChild(descriptionLink);

    modal.appendChild(modalContent);

    return modal;
}