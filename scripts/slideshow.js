document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.mySlides');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const slideInterval = 20000; // 20 seconds

    const showSlide = (index) => {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.classList.remove('fade-out');
            } else if (slide.classList.contains('active')) {
                slide.classList.remove('active');
                slide.classList.add('fade-out');
            } else {
                slide.classList.remove('active', 'fade-out');
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentIndex = index;
    };

    const nextSlide = () => {
        let nextIndex = (currentIndex + 1) % slides.length;
        showSlide(nextIndex);
    };

    // Automatic Slideshow
    let slideTimer = setInterval(nextSlide, slideInterval);

    // Manual Navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-slide'));
            showSlide(index);
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, slideInterval);
        });
    });

    // Optional: Pause on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideTimer));
    slideshowContainer.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
    });
});
