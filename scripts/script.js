// JavaScript File (script.js)
document.addEventListener("DOMContentLoaded", () => {
    const serviceForm = document.getElementById("serviceForm");

    serviceForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const services = document.getElementById("services").value;
        const experience = document.getElementById("experience").value;

        // Display a success message (temporary visual feedback)
        alert(`Thank you, ${fullName}! Your registration is complete.`);

        // Here, we can add further actions like sending the data to a server, etc.
    });

    // Adding visual effects on input focus
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.boxShadow = "0 0 5px rgba(0, 123, 255, 0.5)";
        });

        input.addEventListener("blur", () => {
            input.style.boxShadow = "none";
        });
    });

    // Next button functionality (Add button to HTML directly)
    const nextButtonHTML = `<div class="form-group">
                                <button type="button" class="next-btn">Next</button>
                            </div>`;
    serviceForm.insertAdjacentHTML("beforeend", nextButtonHTML);

    const nextButton = document.querySelector(".next-btn");
    nextButton.addEventListener("click", (event) => {
        event.preventDefault();
        // Logic to navigate to the next section of the form or proceed further
        alert("Proceeding to the next section...");
        // You can add functionality here to show/hide specific form sections
    });
});

// Linking to updated HTML and CSS files
document.querySelector("link[rel='stylesheet']").href = "application.css";
document.querySelector("script[src='application.html']");
