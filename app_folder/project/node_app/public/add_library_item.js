// Get the objects we need to modify
let addItemForm = document.getElementById('add-libraryItem-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputAuthor = document.getElementById("input-author");
    let inputYear = document.getElementById("input-year");
    let inputGenre = document.getElementById("input-genre");
    let inputType = document.getElementById("input-type");
    let inputPatron = document.getElementById("input-patron");


    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let authorValue = inputAuthor.value;
    let yearValue = inputYear.value;
    let genreValue = inputGenre.value;
    let typeValue = inputType.value;
    let patronValue = inputPatron.value;

    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        author: authorValue,
        year: yearValue,
        genre: genreValue,
        item_type_id:typeValue,
        patron_id: patronValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-libraryItem-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputAuthor.value = '';
            inputYear.value = '';
            inputGenre.value = '';
            inputType.value = '';
            inputPatron.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Library_Items
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("library-items-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let genreCell = document.createElement("TD");
    let authorCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let typeCell = document.createElement("TD");
    let patronCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.item_id;
    titleCell.innerText = newRow.title;
    genreCell.innerText = newRow.genre;
    authorCell.innerText = newRow.author;
    yearCell.innerText = newRow.year;
    typeCell.innerText = newRow.item_type_id;
    patronCell.innerText = newRow.patron_id;


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(genreCell);
    row.appendChild(authorCell);
    row.appendChild(yearCell);
    row.appendChild(typeCell);
    row.appendChild(patronCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}