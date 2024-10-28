document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const submitButton = document.querySelector('.btn-submit');

    // Animate form elements on page load
    anime({
        targets: '.form-group',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(100),
        easing: 'easeOutQuad',
        duration: 800
    });

    // Add event listeners and form validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        // Add form validation logic here
        return true;
    }

    function submitForm() {
        // Animate submit button
        anime({
            targets: submitButton,
            scale: [1, 1.1, 1],
            duration: 300,
            easing: 'easeInOutQuad'
        });

        // Add form submission logic here
        console.log('Form submitted successfully!');
    }

    // Add more interactive features and animations here
});

function nextSection(current) {
    const sectionsOrder = [
        'service-offering',
        'job-info-section',
        'identification-verification',
        'qualification-details',
        'professional-info',
        'availability-scheduling',
        'final-submission'
    ];

    const currentIndex = sectionsOrder.indexOf(current);
    if (currentIndex === -1) return;

    // Hide current section
    document.getElementById(current).style.display = 'none';

    // Determine the next section based on conditions
    for (let i = currentIndex + 1; i < sectionsOrder.length; i++) {
        const nextSectionId = sectionsOrder[i];
        let shouldShow = true;

        switch (nextSectionId) {
            case 'job-info-section':
                shouldShow = document.getElementById('job-status').value === 'yes';
                break;
            case 'identification-verification':
                shouldShow = document.getElementById('id-available').value === 'yes';
                break;
            case 'qualification-details':
                shouldShow = document.getElementById('school-qualification').value === 'yes';
                break;
            default:
                shouldShow = true;
        }

        if (shouldShow) {
            document.getElementById(nextSectionId).style.display = 'block';
            updateProgress(i + 1); // Update progress (1-based index)
            return;
        }
    }

    // If no more sections, show final submission
    document.getElementById('final-submission').style.display = 'block';
    updateProgress(sectionsOrder.length);
}

function prevSection(current) {
    const sectionsOrder = [
        'service-offering',
        'job-info-section',
        'identification-verification',
        'qualification-details',
        'professional-info',
        'availability-scheduling',
        'final-submission'
    ];

    const currentIndex = sectionsOrder.indexOf(current);
    if (currentIndex === -1) return;

    // Hide current section
    document.getElementById(current).style.display = 'none';

    // Determine the previous section based on conditions
    for (let i = currentIndex - 1; i >= 0; i--) {
        const prevSectionId = sectionsOrder[i];
        let shouldShow = true;

        switch (prevSectionId) {
            case 'job-info-section':
                shouldShow = document.getElementById('job-status').value === 'yes';
                break;
            case 'identification-verification':
                shouldShow = document.getElementById('id-available').value === 'yes';
                break;
            case 'qualification-details':
                shouldShow = document.getElementById('school-qualification').value === 'yes';
                break;
            default:
                shouldShow = true;
        }

        if (shouldShow) {
            document.getElementById(prevSectionId).style.display = 'block';
            updateProgress(i + 1); // Update progress (1-based index)
            return;
        }
    }

    // If no previous sections, show the first section
    document.getElementById('service-offering').style.display = 'block';
    updateProgress(1);
}

function updateProgress(step) {
    const totalSteps = 7; // Update this if the number of steps changes
    const progress = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    const percentage = (step / totalSteps) * 100;
    progress.style.width = `${percentage}%`;
    progressText.textContent = `Step ${step} of ${totalSteps}`;
}

function toggleJobQuestions() {
    const jobStatus = document.getElementById('job-status').value;
    const jobInfoSection = document.getElementById('job-info-section');
    jobInfoSection.style.display = (jobStatus === 'yes') ? 'block' : 'none';
}

// Similar functions for other follow-up questions
function toggleQualificationDetails() {
    const qualificationStatus = document.getElementById('school-qualification').value;
    const qualificationDetailsSection = document.getElementById('qualification-details');
    qualificationDetailsSection.style.display = (qualificationStatus === 'yes') ? 'block' : 'none';
}

function toggleIdVerification() {
    const idStatus = document.getElementById('id-available').value;
    const idVerificationSection = document.getElementById('identification-verification');
    idVerificationSection.style.display = (idStatus === 'yes') ? 'block' : 'none';
}

function toggleServiceQuestions() {
    const service = document.getElementById('services-offered').value;
    const followUpQuestions = document.getElementById('follow-up-questions');
    const jobStatusQuestion = document.getElementById('job-status-question');
    const qualificationDetails = document.getElementById('qualification-details');

    followUpQuestions.style.display = 'block'; // Show follow-up questions container

    // Example logic for showing/hiding specific questions
    if (service === 'plumbing') {
        jobStatusQuestion.style.display = 'none'; // Hide job status question for plumbing
        qualificationDetails.style.display = 'block'; // Show qualification details
    } else {
        jobStatusQuestion.style.display = 'block'; // Show job status question for other services
        qualificationDetails.style.display = 'none'; // Hide qualification details for other services
    }

    // Add more conditions for other services as needed
}

function validateInitialQuestions() {
    // Add your validation logic here
    // Return true if all initial questions are answered correctly
    // Return false otherwise
    return true; // Placeholder, replace with actual validation
}

function showServiceProviderQuestions() {
    document.getElementById('initialQuestions').style.display = 'none';
    document.getElementById('serviceProviderQuestions').style.display = 'block';
    document.getElementById('navButtons').style.display = 'flex';
    updateProgress(1); // Start progress from 1
}

// Modify the existing nextSection function
function nextSection(current) {
    if (current === 'initialQuestions') {
        if (validateInitialQuestions()) {
            showServiceProviderQuestions();
        } else {
            alert('Please answer all initial questions correctly.');
        }
        return;
    }

    const sectionsOrder = [
        'service-offering',
        'job-info-section',
        'identification-verification',
        'qualification-details',
        'professional-info',
        'availability-scheduling',
        'final-submission'
    ];

    const currentIndex = sectionsOrder.indexOf(current);
    if (currentIndex === -1) return;

    // Hide current section
    document.getElementById(current).style.display = 'none';

    // Determine the next section based on conditions
    for (let i = currentIndex + 1; i < sectionsOrder.length; i++) {
        const nextSectionId = sectionsOrder[i];
        let shouldShow = true;

        switch (nextSectionId) {
            case 'job-info-section':
                shouldShow = document.getElementById('job-status').value === 'yes';
                break;
            case 'identification-verification':
                shouldShow = document.getElementById('id-available').value === 'yes';
                break;
            case 'qualification-details':
                shouldShow = document.getElementById('school-qualification').value === 'yes';
                break;
            default:
                shouldShow = true;
        }

        if (shouldShow) {
            document.getElementById(nextSectionId).style.display = 'block';
            updateProgress(i + 1); // Update progress (1-based index)
            return;
        }
    }

    // If no more sections, show final submission
    document.getElementById('final-submission').style.display = 'block';
    updateProgress(sectionsOrder.length);

    // Show submit button on last section
    if (i === sectionsOrder.length - 1) {
        document.getElementById('submitButtonContainer').style.display = 'block';
    }
}

// Add an event listener to the form submission
document.getElementById('serviceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        submitForm();
    }
});
