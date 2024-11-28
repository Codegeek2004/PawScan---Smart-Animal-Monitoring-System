let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('hidden', i !== index);
    });
}

// Function to go to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Function to go to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Initialize the first slide
showSlide(currentSlide);

// Fetch location display element and button
// Fetch location display element and button
const locationElement = document.getElementById('location');
const saveButton = document.getElementById('save-location');

// Function to fetch location details using reverse geocoding
async function getLocationDetails(latitude, longitude) {
    try {
        const apiKey = '61c55e40b4dc4187ae242e2e5f612b9f';  // Replace with your actual OpenCage API key
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const components = data.results[0].components;
            const area = components.suburb || components.neighbourhood || 'Unknown Area';
            const city = components.city || components.town || components.village || 'Unknown City';
            const state = components.state || 'Unknown State';
            const country = components.country || 'Unknown Country';

            return { area, city, state, country };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching location details:', error);
        return null;
    }
}

// Function to fetch the current location
function updateLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Fetch location details
                const locationDetails = await getLocationDetails(latitude, longitude);

                // Update the location display on the page
                if (locationDetails) {
                    locationElement.textContent = `Current Location: ${locationDetails.area}, ${locationDetails.city}, ${locationDetails.state}, ${locationDetails.country} (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})`;
                } else {
                    locationElement.textContent = `Current Location: Lat ${latitude.toFixed(4)}, Lon ${longitude.toFixed(4)} (Could not fetch location details)`;
                }
            },
            (error) => {
                // Handle location errors with specific messages
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        locationElement.textContent = 'Permission denied. Please enable location access in your browser settings.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        locationElement.textContent = 'Location unavailable. Please try again later.';
                        break;
                    case error.TIMEOUT:
                        locationElement.textContent = 'Request timed out. Please refresh the page and try again.';
                        break;
                    default:
                        locationElement.textContent = `An unknown error occurred (${error.message}).`;
                }
            }
        );
    } else {
        // Browser does not support Geolocation API
        locationElement.textContent = 'Geolocation is not supported by this browser.';
    }
}

// Function to save the current location
function saveLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Fetch location details
                const locationDetails = await getLocationDetails(latitude, longitude);

                // Simulate saving the location
                if (locationDetails) {
                    console.log(`Location saved: ${locationDetails.area}, ${locationDetails.city}, ${locationDetails.state}, ${locationDetails.country} (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})`);
                    alert(`Location saved: ${locationDetails.area}, ${locationDetails.city}, ${locationDetails.state}, ${locationDetails.country} (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})`);
                } else {
                    console.log(`Location saved: Lat ${latitude}, Lon ${longitude}`);
                    alert(`Location saved: Lat ${latitude.toFixed(4)}, Lon ${longitude} (Could not fetch location details)`);
                }
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert('Permission denied. Please enable location access in your browser settings.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('Location unavailable. Please try again later.');
                        break;
                    case error.TIMEOUT:
                        alert('Request timed out. Please refresh the page and try again.');
                        break;
                    default:
                        alert(`An unknown error occurred (${error.message}).`);
                }
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Automatically update location when the page loads
updateLocation();
function validateForm() {
    // Example validation logic (replace with your actual logic)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').innerText = "Passwords do not match.";
        return false;
    }

    // Simulate successful registration
    showSuccessPopup();
    return false; // Prevent form submission for demo purposes
}

function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    popup.classList.remove('hidden');
    popup.style.display = 'block';

    // Hide the popup after 3 seconds
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}


// Add an event listener to the save button
saveButton.addEventListener('click', saveLocation);

