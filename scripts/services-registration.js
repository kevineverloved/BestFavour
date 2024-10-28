document.addEventListener('DOMContentLoaded', () => {
    // Service Categories and Their Respective Services
    const serviceCategories = {
        "home-services": [
            "Electrical Repairs and Installations",
            "Plumbing Services",
            "Handyman Services",
            "Painting and Decorating",
            "Pest Control",
            "Gardening and Landscaping",
            "Pool Maintenance",
            "Security System Installation",
            "Solar Panel and Inverter Installation",
            "Appliance Repair"
        ],
        "personal-services": [
            "Babysitting and Childcare",
            "Elderly Care",
            "Pet Care Services",
            "Personal Training and Fitness Coaching",
            "Beauty Services",
            "Massage Therapy",
            "Tailoring and Alterations"
        ],
        "educational-services": [
            "Tutoring and Homework Assistance",
            "Language Lessons",
            "Music Lessons",
            "Art and Craft Classes",
            "Test Preparation"
        ],
        "technology-services": [
            "IT Support",
            "Home Network Setup",
            "Smart Home Setup",
            "Mobile Phone Repairs"
        ],
        "transportation-services": [
            "Moving and Relocation Assistance",
            "Courier and Delivery Services",
            "Driver Services",
            "Car Wash and Detailing",
            "Vehicle Maintenance"
        ],
        "business-services": [
            "Virtual Assistance",
            "Graphic Design and Branding",
            "Photography and Videography",
            "Event Planning and Catering",
            "Accounting and Bookkeeping",
            "Legal Consulting",
            "Translation Services"
        ],
        "health-wellness": [
            "Dietary and Nutrition Consulting",
            "Yoga and Meditation Instruction",
            "First Aid Training",
            "Herbal and Traditional Healing"
        ],
        "miscellaneous-services": [
            "Waste Removal and Recycling",
            "Errand Running",
            "Queue Standing Services",
            "Firewood Delivery",
            "Sewing and Upholstery Services",
            "Property Management",
            "Carpentry Services",
            "Home Organization",
            "Drone Services",
            "Agricultural Assistance",
            "Solar Geyser Installation",
            "Rainwater Harvesting Systems"
        ],
        "cultural-lifestyle": [
            "Tour Guide Services",
            "Traditional Cooking Classes",
            "Craftsmanship Workshops",
            "Music and Dance Instruction",
            "Event Entertainment"
        ]
    };

    const categorySelect = document.getElementById('service-category');
    const specificServiceSelect = document.getElementById('specific-service');
    const specificServiceGroup = document.getElementById('specific-service-group');
    const continueButtons = document.querySelectorAll('.btn.next');

    // Function to populate specific services based on selected category
    function populateSpecificServices(selectedCategory) {
        specificServiceSelect.innerHTML = '<option value="">-- Select a Service --</option>';
        if (selectedCategory && serviceCategories[selectedCategory]) {
            serviceCategories[selectedCategory].forEach(service => {
                const option = document.createElement('option');
                option.value = service.toLowerCase().replace(/ /g, '-');
                option.textContent = service;
                specificServiceSelect.appendChild(option);
            });
            specificServiceGroup.style.display = 'block';
        } else {
            specificServiceGroup.style.display = 'none';
        }
    }

    categorySelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        populateSpecificServices(selectedCategory);
    });

    // Check if all required fields are answered
    function validateSection(sectionId) {
        const section = document.getElementById(sectionId);
        let allValid = true;

        section.querySelectorAll('input[required], select[required]').forEach(input => {
            const errorMessage = input.closest('.form-group').querySelector('.error-message');
            if (input.type === 'radio') {
                const groupName = input.name;
                const radioGroupChecked = document.querySelector(`input[name="${groupName}"]:checked`);
                if (!radioGroupChecked) {
                    errorMessage.style.display = 'block';
                    allValid = false;
                } else {
                    errorMessage.style.display = 'none';
                }
            } else if (!input.value) {
                errorMessage.style.display = 'block';
                allValid = false;
            } else {
                errorMessage.style.display = 'none';
            }
        });

        return allValid;
    }

    // Enable/Disable continue button
    function updateContinueButton(sectionId) {
        const button = document.querySelector(`#${sectionId} .btn.next`);
        const allValid = validateSection(sectionId);

        if (allValid) {
            button.disabled = false;
            button.style.backgroundColor = ''; // Default button color
        } else {
            button.disabled = true;
            button.style.backgroundColor = 'grey'; // Disabled button color
        }
    }

    // Event listeners for input validation and continue button enabling
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', function() {
            const currentSectionId = input.closest('.form-section').id;
            updateContinueButton(currentSectionId);
        });
    });

    // Function to navigate to the next section
    function nextSection(currentSectionId) {
        if (validateSection(currentSectionId)) {
            const currentSection = document.getElementById(currentSectionId);
            const nextSection = currentSection.nextElementSibling;

            if (nextSection && nextSection.classList.contains('form-section')) {
                currentSection.classList.remove('active');
                nextSection.classList.add('active');
            }
        }
    }

    window.nextSection = nextSection;

    // Initialize all continue buttons as disabled
    continueButtons.forEach(button => {
        button.disabled = true;
        button.style.backgroundColor = 'grey'; // Initial disabled button color
    });

    // Ensure that the specific service group is hidden initially
    specificServiceGroup.style.display = 'none';
});
