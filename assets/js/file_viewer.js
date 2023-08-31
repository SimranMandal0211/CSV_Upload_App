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