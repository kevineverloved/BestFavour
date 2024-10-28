document.addEventListener("DOMContentLoaded", function () {
    const editProfileButton = document.getElementById("editProfileBtn");
    const saveAdditionalInfoButton = document.getElementById("saveAdditionalInfo");
    const additionalInfoForm = document.getElementById('additionalInfoForm');
    const showMoreButton = document.getElementById("showMoreBtn");
    const additionalInfoSection = document.getElementById("additionalInfo");
    const bioDisplay = document.getElementById("bioDisplay");
    const editBioButton = document.getElementById("editBioBtn");

    // Load user profile data from localStorage
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));
    const profilePhoto = localStorage.getItem('profilePhoto');
    const additionalInfo = JSON.parse(localStorage.getItem('additionalInfo'));
    const portfolioImages = JSON.parse(localStorage.getItem('portfolioImages')) || [];

    // Populate profile information
    if (userProfile) {
        document.querySelector('.profile-name').textContent = `${userProfile.firstName} ${userProfile.surname}`;
        document.querySelector('.profile-image').src = profilePhoto || 'images/default-profile.jpg';
        
        // Populate other profile information
        populateProfileInfo(userProfile);
        
        // Populate additional information if available
        if (additionalInfo) {
            bioDisplay.value = additionalInfo.bio || 'No bio available.';
        } else {
            bioDisplay.value = 'No bio available.';
        }

        // Populate portfolio gallery
        populatePortfolioGallery(portfolioImages);
    } else {
        // Handle case where no profile data is found
        document.querySelector('.profile-card').innerHTML = "<p>No profile data found. Please complete your profile on the apply page.</p>";
    }

    function populateProfileInfo(profile) {
        const fields = [
            'firstName',
            'surname',
            'phoneNumber',
            'province',
            'city',
            'streetAddress',
            'experienceYears',
            'qualifications',
            'languages',
            'availability',
            'travelDistance',
            'serviceCategory',
            'specificService'
        ];

        fields.forEach(field => {
            const element = document.querySelector(`[data-field="${field}"]`);
            if (element) {
                element.textContent = Array.isArray(profile[field]) ? profile[field].join(', ') : profile[field];
            }
        });
    }

    function populatePortfolioGallery(images) {
        const gallery = document.getElementById('portfolioGallery');
        gallery.innerHTML = ''; // Clear existing images
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.classList.add('portfolio-image');
            gallery.appendChild(img);
        });
    }

    // Toggle Additional Information
    showMoreButton.addEventListener("click", function () {
        additionalInfoSection.classList.toggle('hidden');
        showMoreButton.textContent = additionalInfoSection.classList.contains('hidden') ? 'Show More' : 'Show Less';
    });

    // Toggle Bio Editing
    editBioButton.addEventListener("click", function () {
        if (bioDisplay.readOnly) {
            bioDisplay.readOnly = false;
            editBioButton.textContent = 'Save Bio';
        } else {
            bioDisplay.readOnly = true;
            editBioButton.textContent = 'Edit Bio';
            saveBio();
        }
    });

    // Save Bio Function
    function saveBio() {
        const bio = bioDisplay.value.trim();
        let existingAdditionalInfo = JSON.parse(localStorage.getItem('additionalInfo')) || {};
        existingAdditionalInfo.bio = bio;
        localStorage.setItem('additionalInfo', JSON.stringify(existingAdditionalInfo));
        alert("Bio saved successfully.");
    }

    saveAdditionalInfoButton.addEventListener("click", function () {
        const bio = document.getElementById('bio').value;
        const paymentDetails = document.getElementById('paymentDetails').value;

        const updatedAdditionalInfo = {
            bio,
            paymentDetails
        };

        // Save additional info to localStorage
        localStorage.setItem('additionalInfo', JSON.stringify(updatedAdditionalInfo));

        // Hide the form
        additionalInfoForm.classList.add('hidden');

        // Optionally update the display if needed
        bioDisplay.value = bio || 'No bio available.';
        alert("Additional information saved successfully.");
    });

    // Handle portfolio image uploads
    document.getElementById('portfolioImages').addEventListener('change', handlePortfolioUpload);
});

function handlePortfolioUpload(event) {
    const files = event.target.files;
    const preview = document.getElementById('portfolioPreview');
    const gallery = document.getElementById('portfolioGallery');

    for (const file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Add to preview
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('portfolio-image');
            preview.appendChild(img);

            // Add to gallery
            const galleryImg = img.cloneNode();
            gallery.appendChild(galleryImg);

            // Save to localStorage
            const portfolioImages = JSON.parse(localStorage.getItem('portfolioImages') || '[]');
            portfolioImages.push(e.target.result);
            localStorage.setItem('portfolioImages', JSON.stringify(portfolioImages));
        };
        reader.readAsDataURL(file);
    }
}
