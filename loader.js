// Create a loader animation container
const loaderContainer = document.createElement('div');
loaderContainer.classList.add('loader-container');

// Create the loader animation element
const loader = document.createElement('div');
loader.classList.add('loader');

// Create the logo element
const logo = document.createElement('img');
logo.src = 'assets/logo.png'; // replace with your logo URL
logo.alt = 'ASOSE Logo';
logo.classList.add('loader-logo');

// Add the loader animation and logo to the container
loaderContainer.appendChild(loader);
loaderContainer.appendChild(logo);

// Append the loader container to the body
document.body.appendChild(loaderContainer);

// Function to show the loader animation
function showLoader() {
  loaderContainer.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to hide the loader animation
function hideLoader() {
  loaderContainer.style.display = 'none';
  document.body.style.overflow = ''; // Allow scrolling
}

// Show the loader animation on page load
showLoader();

// Hide the loader animation after 2 seconds (optional)
setTimeout(hideLoader, 2000);