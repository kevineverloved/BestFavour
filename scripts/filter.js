document.addEventListener('DOMContentLoaded', () => {
    const filterLinks = document.querySelectorAll('.filter-content a');
    const serviceBlocks = document.querySelectorAll('.service-block');

    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.getAttribute('data-filter');

            serviceBlocks.forEach(block => {
                if (filter === 'all' || block.getAttribute('data-category') === filter) {
                    block.style.display = 'block';
                } else {
                    block.style.display = 'none';
                }
            });
        });
    });
});
