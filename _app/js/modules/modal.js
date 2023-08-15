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

export default function createModal(description) {
	const modal = document.createElement('div');
	modal.classList.add('modal');

	const modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');

	const descriptionLink = document.createElement('a');
	descriptionLink.target = '_blank'; // Open the link in a new tab/window
	descriptionLink.style.textDecoration = 'none'; // Remove link decoration

	const descriptionText = document.createElement('p');
	descriptionText.textContent = description || 'Image description or additional information';

	descriptionLink.appendChild(descriptionText);
	modalContent.appendChild(descriptionLink);

	modal.appendChild(modalContent);

	return modal;
}
