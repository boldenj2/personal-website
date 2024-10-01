/* Your JS here. */

//  Function that shrinks the navbar when the user scrolls down the page.
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav.sticky-navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    }
});

// Function that smoothly scrolls the page to the corresponding section when a navbar link is clicked.
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default anchor click behavior
        e.preventDefault(); 

        // Get target section ID
        const targetId = this.getAttribute('href'); 

        // Select target element
        const targetElement = document.querySelector(targetId); 

        //// Height of the navbar
        const navbarHeight = document.querySelector('nav').offsetHeight; 

        // Calculate the position of the target element
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight; 

        window.scrollTo({
            top: targetPosition,
            // Smooth scroll effect
            behavior: 'smooth' 
        });
    });
});



// Select all experience cards
const cards = document.querySelectorAll('.experience-card');

// Iterate through the cards and add click event listeners
cards.forEach((card) => {
    card.addEventListener('click', function () {
        // Check if the card is already expanded
        if (!card.classList.contains('expanded')) {
            // Expand the clicked card
            card.classList.add('expanded');

            // Add a blur effect to the body
            document.body.classList.add('blur');

            // Blur other cards
            cards.forEach((otherCard) => {
                if (otherCard !== card) {
                    otherCard.classList.add('blurred');
                }
            });

            // Add a close button dynamically to the expanded card
            const closeButton = document.createElement('span');
            closeButton.className = 'close-btn';
            closeButton.innerHTML = '&times;'; // HTML code for the '×' character
            card.appendChild(closeButton);

            // Add an event listener to the close button to shrink back the card
            closeButton.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevent the card's click event from triggering

                // Remove the blur effect from other cards
                cards.forEach((otherCard) => {
                    otherCard.classList.remove('blurred');
                });
                // Remove the close button
                card.classList.remove('expanded');   
                closeButton.remove(); 
            });
        }
    });
});


// Close modal if user clicks outside of the modal card
window.addEventListener('click', function (event) {
    // Loop through each card to find if it's expanded
    cards.forEach((card) => {
        if (card.classList.contains('expanded')) {

            // Check if the clicked target is not inside the expanded card
            if (!card.contains(event.target)) {

                 // Collapse the card
                card.classList.remove('expanded');

                // Remove the close button if it exists
                const closeButton = card.querySelector('.close-btn');
                if (closeButton) {
                    closeButton.remove();
                }
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel-images img');
    let currentIndex = 0;

    function changeImage(direction) {
        // Hide current image
        images[currentIndex].classList.remove('active');

        // Update index
        currentIndex = (currentIndex + direction + images.length) % images.length; 
        // Show new image
        images[currentIndex].classList.add('active');
    }

    // Show the first image
    images[currentIndex].classList.add('active'); 

    // Add event listeners for carousel controls (assuming you have buttons with classes 'prev' and 'next')
    document.querySelector('.prev').addEventListener('click', () => changeImage(-1));
    document.querySelector('.next').addEventListener('click', () => changeImage(1));
});