let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("fade-in", "fade-out");
        slides[i].style.display = "none"; // Ensure slides are hidden initially
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].classList.add("fade-in");
    slides[slideIndex - 1].style.display = "block"; // Show the current slide
    setTimeout(() => {
        slides[slideIndex - 1].classList.add("fade-out");
    }, 18000); // Start fade-out effect before the next slide
    setTimeout(showSlides, 20000); // Change image every 20 seconds
}

// CSS for fade-in and fade-out effects
const style = document.createElement('style');
style.innerHTML = `
    .fade-in {
        animation: $1 0.3s ease-in forwards;
    }
    .fade-out {
        animation: $1 0.3s ease-out forwards;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
