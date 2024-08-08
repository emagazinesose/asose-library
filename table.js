$(document).ready(function () {
    const itemsPerPage = 10;
    let currentPage = 1;
    let data = [];

    // Load and parse CSV file
    function loadData() {
        $.ajax({
            url: 'data.csv', // Replace with the path to your CSV file
            dataType: 'text',
            success: function (csvData) {
                Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function (results) {
                        data = results.data.map(row => ({
                            custNo: row['Cust. No.'],
                            units: row['No. of Units'],
                            rate: row['Rate'],
                            bill: row['Bill Amount']
                        }));
                        renderTable(); // Call renderTable after data is loaded
                    },
                    error: function (error) {
                        console.error('Error parsing CSV:', error);
                    }
                });
            },
            error: function (error) {
                console.error('Error loading CSV file:', error);
            }
        });
    }

    // Function to render the table data
    function renderTable() {
        let filteredData = data.filter(row => {
            const searchVal = $('#search').val().toLowerCase();
            return row.custNo.toLowerCase().includes(searchVal);
        });

        const totalItems = filteredData.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedData = filteredData.slice(start, end);

        const tbody = $('#data-table tbody');
        tbody.empty();

        paginatedData.forEach(row => {
            const tr = `<tr>
                <td>${row.custNo}</td>
                <td>${row.units}</td>
                <td>${row.rate}</td>
                <td>${row.bill}</td>
            </tr>`;
            tbody.append(tr);
        });

        renderPagination(totalPages); // Call to render pagination
    }

    // Function to render pagination buttons
    function renderPagination(totalPages) {
        const pagination = $('#pagination');
        pagination.empty();

        // Show the first page
        if (currentPage > 1) {
            pagination.append(createPaginationButton(1));
        }

        // Show ellipsis if necessary
        if (currentPage > 3) {
            pagination.append(createEllipsis());
        }

        // Show current, previous, and next pages
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pagination.append(createPaginationButton(i));
        }

        // Show ellipsis if necessary
        if (currentPage < totalPages - 2) {
            pagination.append(createEllipsis());
        }

        // Show the last page
        if (currentPage < totalPages) {
            pagination.append(createPaginationButton(totalPages));
        }

        // Previous and Next buttons
        if (currentPage > 1) {
            pagination.prepend(createPaginationButton('Prev', currentPage - 1));
        }

        if (currentPage < totalPages) {
            pagination.append(createPaginationButton('Next', currentPage + 1));
        }
    }

    // Function to create a pagination button
    function createPaginationButton(text, page = text) {
        const button = $('<button></button>').text(text);

        if (page === currentPage) {
            button.addClass('disabled');
        } else {
            button.on('click', function () {
                currentPage = page;
                renderTable();
            });
        }

        return button;
    }

    // Function to create ellipsis
    function createEllipsis() {
        return $('<button></button>').text('...').addClass('ellipsis');
    }

    // Listen for search input changes
    $('#search').on('input', function () {
        currentPage = 1;
        renderTable();
    });

    loadData(); // Load CSV data on page load
});
