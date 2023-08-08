/**
 * This function is responsible for sliding through banner images at regular intervals.
 * It achieves this by toggling an 'active' class on the slides.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll MDN - Document.querySelectorAll()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval MDN - setInterval()}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/classList MDN - Element.classList}
 */

export default function startBannerSlide() {
    // Define the initial active slide index
    let activeSlide = 0;
    
    // Fetch all banner slides and convert the NodeList to an array
    const slides = Array.from(document.querySelectorAll('.banner__slide'));

    // If there are no slides, exit the function early
    if (slides.length === 0) {
        console.warn('No banner slides found.');
    }
    
    function changeSlide() {
        // Iterate over each slide
        slides.forEach((slide, index) => {
            // If the slide index matches the activeSlide index, add the 'active' class to it
            if (index === activeSlide) {
                slide.classList.add('active');
            } else {
                // Otherwise, remove the 'active' class
                slide.classList.remove('active');
            }
        });
        
        // Move to the next slide, and wrap around if we've reached the end of the slides array
        activeSlide = (activeSlide + 1) % slides.length;
    }

    // Call the function once initially to show the first slide
    changeSlide();
    
    // Set up an interval to change the slide every 3 seconds
    setInterval(() => {
        changeSlide();
    }, 3000);
}
