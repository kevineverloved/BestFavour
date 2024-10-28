document.addEventListener("DOMContentLoaded", function () {
    const olderThan16Options = document.getElementsByName("olderThan16");
    const southAfricanOptions = document.getElementsByName("southAfrican");
    const ageError = document.getElementById("ageError");
    const countryError = document.getElementById("countryError");
    const doneButton = document.getElementById("doneButton");

    const provinceSelect = document.getElementById("province");
    const citySelect = document.getElementById("city");

    const citiesByProvince = {
        "Eastern Cape": ["Port Elizabeth", "East London", "Mthatha"],
        "Free State": ["Bloemfontein", "Welkom", "Bethlehem"],
        "Gauteng": ["Johannesburg", "Pretoria", "Soweto"],
        "KwaZulu-Natal": ["Durban", "Pietermaritzburg", "Richards Bay"],
        "Limpopo": ["Polokwane", "Thohoyandou", "Tzaneen"],
        "Mpumalanga": ["Nelspruit", "Witbank", "Secunda"],
        "Northern Cape": ["Kimberley", "Upington", "Springbok"],
        "North West": ["Rustenburg", "Mahikeng", "Klerksdorp"],
        "Western Cape": ["Cape Town", "Stellenbosch", "Paarl"]
    };

    const continueButton = document.getElementById("continueButton");
    const serviceContinueButton = document.getElementById("serviceContinueButton");
    const basicInfoSection = document.getElementById("basicInfoSection");
    const serviceVerificationSection = document.getElementById("serviceVerificationSection");
    const additionalInfoSection = document.getElementById("additionalInfoSection");
    const registrationForm = document.getElementById("registrationForm");

    const verificationForm = document.getElementById("verificationForm");
    const additionalInfoForm = document.getElementById("additionalInfoForm");

    // Real-time validation for phone number
    const phoneNumberInput = document.getElementById("phoneNumber");
    phoneNumberInput.addEventListener("input", function () {
        if (!phoneNumberInput.checkValidity()) {
            phoneNumberInput.classList.add("invalid");
        } else {
            phoneNumberInput.classList.remove("invalid");
        }
    });

    // Real-time validation for file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener("change", function () {
            if (!input.files.length) {
                input.classList.add("invalid");
            } else {
                input.classList.remove("invalid");
            }
        });
    });

    // Show specific service options based on selected category
    const serviceCategorySelect = document.getElementById("serviceCategory");
    const specificServiceGroup = document.getElementById("specificServiceGroup");
    const specificServiceSelect = document.getElementById("specificService");

    // Define specific services for each category
    const servicesByCategory = {
        "Home Services": ["Plumbing", "Electrical", "Cleaning"],
        "Personal Services": ["Hairdressing", "Massage", "Personal Training"],
        "Educational Services": ["Tutoring", "Music Lessons", "Language Classes"],
        "Technology Services": ["IT Support", "Web Development", "Graphic Design"]
        // Add more categories and services as needed
    };

    serviceCategorySelect.addEventListener("change", function () {
        const selectedCategory = serviceCategorySelect.value;

        if (selectedCategory) {
            specificServiceGroup.style.display = "block";
            specificServiceSelect.innerHTML = '<option value="">-- Select a Specific Service --</option>';

            // Populate specific services based on the selected category
            const services = servicesByCategory[selectedCategory] || [];
            services.forEach(service => {
                const option = document.createElement("option");
                option.value = service;
                option.textContent = service;
                specificServiceSelect.appendChild(option);
            });
        } else {
            specificServiceGroup.style.display = "none";
        }
    });

    // Check eligibility based on age and country selection
    function checkEligibility() {
        let ageNotEligible = false;
        let countryNotEligible = false;

        // Check if "No" is selected for age
        olderThan16Options.forEach(option => {
            if (option.checked && option.value === "no") {
                ageNotEligible = true;
            }
        });

        // Check if "No" is selected for South African eligibility
        southAfricanOptions.forEach(option => {
            if (option.checked && option.value === "no") {
                countryNotEligible = true;
            }
        });

        // Show or hide the age error message
        if (ageNotEligible) {
            ageError.style.display = "block";
            doneButton.disabled = true;
        } else {
            ageError.style.display = "none";
        }

        // Show or hide the country error message
        if (countryNotEligible) {
            countryError.style.display = "block";
            doneButton.disabled = true;
        } else {
            countryError.style.display = "none";
        }

        // Enable "I'm Done" button if no errors
        if (!ageNotEligible && !countryNotEligible && registrationForm.checkValidity()) {
            doneButton.disabled = false;
        }
    }

    // Add event listeners to check eligibility when the user selects an option
    olderThan16Options.forEach(option => option.addEventListener("change", checkEligibility));
    southAfricanOptions.forEach(option => option.addEventListener("change", checkEligibility));

    // Run eligibility check on page load in case the form has pre-filled data
    checkEligibility();

    provinceSelect.addEventListener("change", function () {
        const selectedProvince = provinceSelect.value;
        const cities = citiesByProvince[selectedProvince] || [];

        // Clear existing city options
        citySelect.innerHTML = '<option value="">-- Select a City --</option>';

        // Populate city dropdown based on selected province
        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    });

    // Function to check form validity
    function checkFormValidity() {
        if (registrationForm.checkValidity()) {
            continueButton.disabled = false; // Enable button
        } else {
            continueButton.disabled = true; // Disable button
        }
    }

    // Add event listeners to all inputs in the registration form
    const formInputs = registrationForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener("input", checkFormValidity);
        input.addEventListener("change", checkFormValidity);
    });

    // Initial check on page load
    checkFormValidity();

    continueButton.addEventListener("click", function () {
        if (registrationForm.checkValidity()) {
            basicInfoSection.style.display = "none";
            serviceVerificationSection.style.display = "block";
        }
    });

    serviceContinueButton.addEventListener("click", function () {
        if (verificationForm.checkValidity()) {
            serviceVerificationSection.style.display = "none";
            additionalInfoSection.style.display = "block";
        }
    });

    const serviceBackButton = document.getElementById("serviceBackButton");
    const additionalBackButton = document.getElementById("additionalBackButton");

    // Back button for Service & Verification section
    serviceBackButton.addEventListener("click", function () {
        serviceVerificationSection.style.display = "none";
        basicInfoSection.style.display = "block";
    });

    // Back button for Additional Information section
    additionalBackButton.addEventListener("click", function () {
        additionalInfoSection.style.display = "none";
        serviceVerificationSection.style.display = "block";
    });

    // Function to check form validity for Service & Verification section
    function checkVerificationFormValidity() {
        if (verificationForm.checkValidity()) {
            serviceContinueButton.disabled = false;
        } else {
            serviceContinueButton.disabled = true;
        }
    }

    // Function to check form validity for Additional Information section
    function checkAdditionalInfoFormValidity() {
        if (additionalInfoForm.checkValidity()) {
            doneButton.disabled = false;
        } else {
            doneButton.disabled = true;
        }
    }

    // Add event listeners to all inputs in the verification form
    const verificationInputs = verificationForm.querySelectorAll('input, select');
    verificationInputs.forEach(input => {
        input.addEventListener("input", checkVerificationFormValidity);
        input.addEventListener("change", checkVerificationFormValidity);
    });

    // Add event listeners to all inputs in the additional info form
    const additionalInfoInputs = additionalInfoForm.querySelectorAll('input, select');
    additionalInfoInputs.forEach(input => {
        input.addEventListener("input", checkAdditionalInfoFormValidity);
        input.addEventListener("change", checkAdditionalInfoFormValidity);
    });

    // Initial checks on page load
    checkVerificationFormValidity();
    checkAdditionalInfoFormValidity();

    const hasQualificationsOptions = document.getElementsByName("hasQualifications");
    const qualificationsGroup = document.getElementById("qualificationsGroup");

    // Function to toggle the display of the qualifications input
    function toggleQualificationsInput() {
        let showQualifications = false;

        hasQualificationsOptions.forEach(option => {
            if (option.checked && option.value === "yes") {
                showQualifications = true;
            }
        });

        if (showQualifications) {
            qualificationsGroup.style.display = "block";
        } else {
            qualificationsGroup.style.display = "none";
        }
    }

    // Add event listeners to the qualifications radio buttons
    hasQualificationsOptions.forEach(option => option.addEventListener("change", toggleQualificationsInput));

    // Initial check on page load
    toggleQualificationsInput();

    const reviewSection = document.getElementById("reviewSection");
    const reviewContent = document.getElementById("reviewContent");
    const editButton = document.getElementById("editButton");

    doneButton.addEventListener("click", function () {
        if (additionalInfoForm.checkValidity()) {
            additionalInfoSection.style.display = "none";
            reviewSection.style.display = "block";
            populateReview();
        }
    });

    editButton.addEventListener("click", function () {
        reviewSection.style.display = "none";
        basicInfoSection.style.display = "block";
    });

    function populateReview() {
        const firstName = document.getElementById("firstName").value;
        const surname = document.getElementById("surname").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const province = document.getElementById("province").value;
        const city = document.getElementById("city").value;
        const streetAddress = document.getElementById("streetAddress").value;
        const experienceYears = document.getElementById("experienceYears").value;
        const qualifications = document.getElementById("qualifications").value;
        const travelDistance = document.getElementById("travelDistance").value;
        const profilePhoto = document.getElementById("profilePhoto").files[0];

        let languages = [];
        document.querySelectorAll('input[name="languages"]:checked').forEach(checkbox => {
            languages.push(checkbox.value);
        });

        let availability = [];
        document.querySelectorAll('input[name="availability"]:checked').forEach(checkbox => {
            availability.push(checkbox.value);
        });

        let reviewHTML = '';

        if (profilePhoto) {
            const reader = new FileReader();
            reader.onload = function (e) {
                reviewHTML += `<img src="${e.target.result}" alt="Profile Photo" class="profile-photo">`;
                reviewHTML += `
                    <p><strong>First Name:</strong> ${firstName}</p>
                    <p><strong>Surname:</strong> ${surname}</p>
                    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                    <p><strong>Province:</strong> ${province}</p>
                    <p><strong>City:</strong> ${city}</p>
                    <p><strong>Street Address:</strong> ${streetAddress}</p>
                    <p><strong>Years of Experience:</strong> ${experienceYears}</p>
                    <p><strong>Qualifications:</strong> ${qualifications}</p>
                    <p><strong>Languages Spoken:</strong> ${languages.join(', ')}</p>
                    <p><strong>Availability:</strong> ${availability.join(', ')}</p>
                    <p><strong>Willing to Travel:</strong> ${travelDistance} km</p>
                `;
                reviewContent.innerHTML = reviewHTML;
            };
            reader.readAsDataURL(profilePhoto);
        } else {
            reviewHTML += `
                <p><strong>First Name:</strong> ${firstName}</p>
                <p><strong>Surname:</strong> ${surname}</p>
                <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                <p><strong>Province:</strong> ${province}</p>
                <p><strong>City:</strong> ${city}</p>
                <p><strong>Street Address:</strong> ${streetAddress}</p>
                <p><strong>Years of Experience:</strong> ${experienceYears}</p>
                <p><strong>Qualifications:</strong> ${qualifications}</p>
                <p><strong>Languages Spoken:</strong> ${languages.join(', ')}</p>
                <p><strong>Availability:</strong> ${availability.join(', ')}</p>
                <p><strong>Willing to Travel:</strong> ${travelDistance} km</p>
            `;
            reviewContent.innerHTML = reviewHTML;
        }
    }

    document.getElementById('submitButton').addEventListener('click', function() {
        // Gather all user information
        const userProfile = {
            firstName: document.getElementById('firstName').value,
            surname: document.getElementById('surname').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            province: document.getElementById('province').value,
            city: document.getElementById('city').value,
            streetAddress: document.getElementById('streetAddress').value,
            experienceYears: document.getElementById('experienceYears').value,
            qualifications: document.getElementById('qualifications').value,
            languages: Array.from(document.querySelectorAll('input[name="languages"]:checked')).map(cb => cb.value),
            availability: Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(cb => cb.value),
            travelDistance: document.getElementById('travelDistance').value,
            serviceCategory: document.getElementById('serviceCategory').value,
            specificService: document.getElementById('specificService').value
        };

        // Save profile data to localStorage
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        // Handle profile photo
        const profilePhoto = document.getElementById('profilePhoto').files[0];
        if (profilePhoto) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('profilePhoto', e.target.result);
                // Redirect to profile page after saving
                window.location.href = 'profile.html';
            };
            reader.readAsDataURL(profilePhoto);
        } else {
            // Redirect to profile page if no photo
            window.location.href = 'profile.html';
        }
    });

    // Add this after your existing file input event listeners
    const photoGuideImages = document.querySelectorAll('.guide-image img');
    photoGuideImages.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'images/fallback-image.jpg'; // Update fallback image path
            console.log('Failed to load guide image:', this.alt);
        });
    });
});
