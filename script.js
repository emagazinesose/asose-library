const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

const searchInput = document.getElementById('search-input');
const tableBody = document.querySelector('.myTable');

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = tableBody.rows;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const columns = row.cells;

      let match = false;
      for (let j = 0; j < columns.length; j++) {
        const column = columns[j];
        const text = column.textContent.toLowerCase();

        if (text.includes(searchTerm)) {
          match = true;
          break;
        }
      }

      if (match) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    }
  });