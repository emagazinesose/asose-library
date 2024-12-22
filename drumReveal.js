// Select the overlay
const overlay = document.querySelector(".overlay");

// Function to remove overlay after animation
function removeOverlay() {
  overlay.style.opacity = 0;
  setTimeout(() => {
    overlay.style.display = "none"; // Hide it after the fade
  }, 1000); // Match with fade-out duration
}

// Hide the overlay after 5 seconds (adjust as per animation duration)
setTimeout(removeOverlay, 7000); // Hide overlay after 5 seconds

// Optionally, add 'hidden' class for CSS fade-out effect
setTimeout(() => {
  overlay.classList.add("hidden");
}, 4000); // This adds 'hidden' class after 4 seconds (animation duration)
