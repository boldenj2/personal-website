/* Your JS here. */

//  Function that shrinks the navbar when the user scrolls down the page.
const shrinkStickyNavigationBar = window.addEventListener('scroll', function() {
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
const smoothScroll = document.querySelectorAll('nav a').forEach(anchor => {
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


const highlightActiveMenuItem = document.addEventListener('DOMContentLoaded', () => {
    // Select all navigation menu links
    const menuItems = document.querySelectorAll('.sticky-navbar a');

    // Get sections based on the href attribute of the menu links
    const sections = Array.from(menuItems).map(link => document.querySelector(link.getAttribute('href')));

    // Function to update the active menu item based on scroll position
    function updateActiveMenuItem() {
        let activeIndex = -1;

        // Loop through each section to check its position relative to the viewport
        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top;

            // If the section top is less than or equal to half the viewport height, it is in view
            if (sectionTop >= 0 && sectionTop <= window.innerHeight / 2) {
                activeIndex = index;
            }
        });

       // Remove the active class from all menu items
       menuItems.forEach(item => item.classList.remove('active'));

       // Highlight the active menu item if it's found
       if (activeIndex !== -1) {
           menuItems[activeIndex].classList.add('active');
       }

       // Special case: Highlight the last menu item if we're at the very bottom of the page
       const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 10; // Small buffer

       if (isAtBottom) {
           menuItems.forEach(item => item.classList.remove('active')); 
           menuItems[menuItems.length - 1].classList.add('active'); 
        }
    }

    // Attach the scroll event listener to update the active menu item
    window.addEventListener('scroll', updateActiveMenuItem);

    // Initial update on page load
    updateActiveMenuItem();
});

function handleExperienceCardClick() {
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
                        otherCard.style.pointerEvents = 'none'; 
                    }
                });

                // Add a close button dynamically to the expanded card
                const closeButton = document.createElement('span');
                closeButton.className = 'close-btn';
                closeButton.innerHTML = '&times;'; 
                card.appendChild(closeButton);

                // Add an event listener to the close button to shrink back the card
                closeButton.addEventListener('click', function (e) {
                    // Prevent the card's click event from triggering
                    e.stopPropagation(); 

                    card.classList.remove('expanded');

                    // Remove the blur effect from other cards
                    cards.forEach((otherCard) => {
                        otherCard.classList.remove('blurred');
                        otherCard.style.pointerEvents = 'auto';
                    });
                    closeButton.remove();
                    document.body.classList.remove('blur');
                });
            }
        });
    });

    // Close modal if user clicks outside of the modal card
    document.addEventListener('click', (event) => {
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

                    // Remove blur effect from other cards
                    cards.forEach((otherCard) => {
                        otherCard.classList.remove('blurred');
                        otherCard.style.pointerEvents = 'auto';
                    });

                    // Remove blur effect from body
                    document.body.classList.remove('blur');
                }
            }
        });
    });
}

handleExperienceCardClick();


document.addEventListener('DOMContentLoaded', () => {
    // Select both images and videos within the carousel
    const mediaItems = document.querySelectorAll('.carousel-images img, .carousel-images video');
    let currentIndex = 0;

    function changeMedia(direction) {
        // Hide the current media item and pause video if it's a video
        const currentItem = mediaItems[currentIndex];
        currentItem.classList.remove('active');
        if (currentItem.tagName.toLowerCase() === 'video') {
            currentItem.pause(); // Pause the video
        }

        // Update index based on direction (-1 for prev, 1 for next)
        currentIndex = (currentIndex + direction + mediaItems.length) % mediaItems.length;

        // Show the new media item and play if it's a video
        const newItem = mediaItems[currentIndex];
        newItem.classList.add('active');
        if (newItem.tagName.toLowerCase() === 'video') {
            newItem.currentTime = 0; // Optional: Reset the video to start
            newItem.play(); // Play the video
        }
    }

    // Show the first media item and play if it's a video
    mediaItems[currentIndex].classList.add('active');
    if (mediaItems[currentIndex].tagName.toLowerCase() === 'video') {
        mediaItems[currentIndex].play();
    }

    // Add event listeners for carousel controls
    document.querySelector('.prev').addEventListener('click', () => changeMedia(-1));
    document.querySelector('.next').addEventListener('click', () => changeMedia(1));
});
