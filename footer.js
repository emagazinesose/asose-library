document.addEventListener("DOMContentLoaded", function () {
  // Create a footer element
  var footer = document.createElement("footer");
  footer.className = "footer";

  // Add content to the footer
  footer.innerHTML = `
      <p>&copy; 2024 ASOSE, Sector 11, Rohini</p>
      <p>Developed & Maintained with &hearts; by Om Prakash Sahoo</p>
    `;

  // Append the footer to the body
  document.body.appendChild(footer);
});
