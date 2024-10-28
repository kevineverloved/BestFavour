const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

const toggleNav = () => {
    navLinks.classList.toggle('active');
    navbar.classList.toggle('active');
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
};

hamburger.addEventListener('click', toggleNav);

// Enable toggle with Enter key for accessibility
hamburger.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        toggleNav();
    }
});