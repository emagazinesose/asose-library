document.addEventListener("DOMContentLoaded", function () {
  // Create a footer element
  var footer = document.createElement("footer");
  footer.className = "footer";

  // Add content to the footer
  footer.innerHTML = `
      <main class="main"><h1 style="margin-top:0; font-weight: 400; color:#fff;">all the best for the exams!</h1></main>
      <p style="font-weight:600">Developed & Maintained with ❤️‍🔥 by <a href="/developer.html">Om Sahoo</a></p>
      <p style="font-weight:800">&copy; 2024 ASOSE, Sector 11, Rohini</p>
    `;

  // Append the footer to the body
  document.body.appendChild(footer);
});
