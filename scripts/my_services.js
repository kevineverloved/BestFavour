document.addEventListener('DOMContentLoaded', function () {
    // Function to handle the display of conditional sections
    function handleConditionalSections() {
        // Get all conditional sections
        const conditionalSections = document.querySelectorAll('.conditional-section');
        
        conditionalSections.forEach(section => {
            const parentId = section.getAttribute('data-dependent');
            const showValue = section.getAttribute('data-show-value');
            const parentElement = document.getElementById(parentId);
            
            if (parentElement) {
                // Determine the type of parent element
                let parentValue = '';
                if (parentElement.tagName.toLowerCase() === 'select') {
                    parentValue = parentElement.value;
                } else if (parentElement.type === 'checkbox' || parentElement.type === 'radio') {
                    const checkedElement = document.querySelector(`#${parentId}:checked`);
                    parentValue = checkedElement ? checkedElement.value : '';
                } else {
                    parentValue = parentElement.value;
                }
                
                // Show or hide the section based on the parent value
                if (parentValue === showValue) {
                    section.style.display = 'block';
                    section.setAttribute('aria-hidden', 'false');
                    section.style.opacity = '1';
                    section.style.maxHeight = '1000px';
                    section.style.animation = 'fadeIn 0.5s ease-in-out';
                    
                    // If the section contains input fields, enable them
                    const inputs = section.querySelectorAll('input, select, textarea');
                    inputs.forEach(input => {
                        input.disabled = false;
                    });
                } else {
                    section.style.display = 'none';
                    section.setAttribute('aria-hidden', 'true');
                    section.style.opacity = '0';
                    section.style.maxHeight = '0';
                    
                    // If the section contains input fields, disable them and clear their values
                    const inputs = section.querySelectorAll('input, select, textarea');
                    inputs.forEach(input => {
                        input.disabled = true;
                        input.value = '';
                        if (input.type === 'file') {
                            input.value = null;
                        }
                    });
                }
            }
        });
    }

    // Initialize conditional sections on page load
    handleConditionalSections();

    // Get all parent elements that have dependent sections
    const parents = document.querySelectorAll('[data-dependent]');
    
    parents.forEach(parentId => {
        const parentElement = document.getElementById(parentId.getAttribute('data-dependent'));
        if (parentElement) {
            parentElement.addEventListener('change', handleConditionalSections);
        }
    });

    // Prevent submission of hidden fields
    document.querySelector('.services-form').addEventListener('submit', function (e) {
        const hiddenSections = document.querySelectorAll('.conditional-section[aria-hidden="true"]');
    
        hiddenSections.forEach(section => {
            const inputs = section.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.disabled = true;
            });
        });
    });

    const sections = document.querySelectorAll('.form-section');
    let currentSectionIndex = 0;

    // Function to get all currently visible sections
    function getVisibleSections() {
        return Array.from(sections).filter(section => section.style.display !== 'none');
    }

    // Function to update the progress indicator
    function updateProgress() {
        const progressIndicator = document.querySelector('.progress-indicator');
        if (progressIndicator) {
            progressIndicator.textContent = `Step ${currentSectionIndex + 1} of ${visibleSections.length}`;
        }
    }

    function showSection(index) {
        visibleSections = getVisibleSections();
        sections.forEach((section, i) => {
            if (visibleSections[index] === section) {
                section.style.display = 'block';
                section.style.opacity = '1';
                section.style.transition = 'opacity 0.5s ease';
                
                // Manage focus for accessibility
                const firstInput = section.querySelector('input, select, textarea');
                if (firstInput && typeof firstInput.focus === 'function') {
                    firstInput.focus();
                }
            } else {
                section.style.display = 'none';
                section.style.opacity = '0';
                section.style.transition = 'opacity 0.5s ease';
            }
        });
        updateProgress();
    }

    window.nextSection = function () {
        if (currentSectionIndex < visibleSections.length - 1) {
            currentSectionIndex++;
            showSection(currentSectionIndex);
        }
    };

    window.prevSection = function () {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            showSection(currentSectionIndex);
        }
    };

    // Initialize the first section and the progress indicator
    showSection(currentSectionIndex);

    // Add event listener to next and previous buttons for visual feedback
    const buttons = document.querySelectorAll('.btn.next, .btn.prev');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('button-clicked');
            setTimeout(() => {
                button.classList.remove('button-clicked');
            }, 150);
        });
    });

    // Real-time validation feedback for inputs
    const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('input', function () {
            if (input.validity.valid) {
                input.classList.remove('input-error');
            } else {
                input.classList.add('input-error');
            }
        });
    });

    // Display tooltips for mandatory fields
    requiredInputs.forEach(input => {
        if (input.hasAttribute('required')) {
            input.setAttribute('title', 'This field is required');
        }
    });
});
