/**
 * This function is responsible for toggling the "header__nav--active" class for the navigation menu when the 
 * menu button is clicked. The "header__nav--active" class controls the visibility of the navigation menu, thus 
 * this function enables the responsive design of the navigation menu.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector MDN - Document.querySelector()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener MDN - EventTarget.addEventListener()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList MDN - Element.classList}
 * @see {@link https://jsdoc.app/}
 */

export default function toggleMenuVisibility () {
    const menuButton = document.querySelector(".header__menu-button");
    const nav = document.querySelector(".header__nav");

    menuButton.addEventListener("click", function() {
        nav.classList.toggle("header__nav--active");
    });
};