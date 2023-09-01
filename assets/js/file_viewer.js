
// Search Text
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', searchText);

function searchText(e){
    console.log('search text function');
    e.preventDefault();
    // Get the input and convert to lowercase
    const input = document.getElementById('search-input').value.toLowerCase();
    // console.log('input in lowercase', input);

    // Get all table rows and itrate through them
    const rows = document.querySelectorAll('tbody tr');

    for(let i = 0; i < rows.length; i++){
        // Get the text content of each row and convert it to lowercase
        const rowText = rows[i].textContent.toLowerCase();

        // console.log('rowText', rowText);

        // If th einput value is found in the row text, highlight the row 
        if(rowText.includes(input)){
            // rows[i].classList.add('highlight');
            rows[i].style.display = 'table-row';
        }else{
            // rows[i].classList.remove('highlight');
            rows[i].style.display = 'none';
        }
    }
}

// sorting table data onclick th
console.log('results',results);
$('th').on('click', function () {
    let column = $(this).data('column');
    let order = $(this).data('order');
    console.log('column clicked', column, 'order-->', order);

    if (order == 'desc') {
        $(this).data('order', 'asc');
        results = results.sort((a, b) => {
            const valueA = String(a[column]); // Convert to string
            const valueB = String(b[column]); // Convert to string

            if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
                // If both values are numeric, compare them as numbers
                return Number(valueA) - Number(valueB);
            } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                // Compare as strings
                return valueA.localeCompare(valueB);
            } else {
                // Handle cases where one of the values is undefined or not a string
                return 0; // You can choose to handle this differently based on your use case
            }
        });
        console.log('results', results);
    } else {
        $(this).data('order', 'desc');
        results = results.sort((a, b) => {
            const valueA = String(a[column]); // Convert to string
            const valueB = String(b[column]); // Convert to string

            if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
                // If both values are numeric, compare them as numbers
                return Number(valueB) - Number(valueA);
            } else if (typeof valueA === 'string' && typeof valueB === 'string') {
                // Compare as strings
                return valueB.localeCompare(valueA);
            } else {
                // Handle cases where one of the values is undefined or not a string
                return 0; // You can choose to handle this differently based on your use case
            }
        });
    }

    // After sorting, re-render the table with the updated results
    renderTable(results);
    // After sorting, re-render the table and page info together
    paginationTable(results);
});

function renderTable(data) {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; // Clear the existing table body

    for (const item of data) {
        const row = document.createElement('tr');
        
        for (const key in item) {
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }
}

// Pageing
let currentPage = 1;
let recordsPerPage = 10;

function paginationTable(){
    console.log('paging');

    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = Math.min(startIndex + recordsPerPage, results.length);
    const sliceData = results.slice(startIndex, endIndex);

    // clear the existing table content
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    // Populate the table with data from the current page
    for(const item of sliceData){
        const row = document.createElement('tr');
        for(const key in item){
            const cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    // Update the start and end entry numbers
    document.getElementById('start-entry').textContent = startIndex + 1;
    document.getElementById('end-entry').textContent = endIndex;

    updatePageInfo(results);
}


// Update the total pages and entry count information
function updatePageInfo(){
    const totalEntries = results.length;
    const totalPages = Math.ceil(totalEntries / recordsPerPage);

    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    document.getElementById('total-entries').textContent = totalEntries;
}

// Add event listener for "Next" button
document.getElementById('next-page').addEventListener('click', function(){
    if(currentPage < Math.ceil(results.length / recordsPerPage)){
        currentPage++;
        paginationTable();
        updatePageInfo();
    }
});

// Add event listener for "Previous" button
document.getElementById('prev-page').addEventListener('click', function(){
    if(currentPage > 1){
        currentPage--;
        paginationTable();
        updatePageInfo();
    }
});

// Initial rendering of the table and page info
paginationTable();
updatePageInfo();