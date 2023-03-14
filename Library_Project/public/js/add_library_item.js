// Citation for the following code:
// Date: 3/1/2023
// Adapted from nodejs-starter-app with changes to apply to my database application
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addLibraryItemForm = document.getElementById('add-library-item-form-ajax');

// Modify the objects we need
addLibraryItemForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputGenre = document.getElementById("input-genre");
    let inputAuthor = document.getElementById("input-author");
    let inputYear = document.getElementById("input-year");
    let inputItemTypeID = document.getElementById("input-item_type_id");
    let inputPatronID = document.getElementById("input-patron_id");

    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let genreValue = inputGenre.value;
    let authorValue = inputAuthor.value;
    let yearValue = inputYear.value;
    let itemTypeIDValue = inputItemTypeID.value;
    let patronIDValue = inputPatronID.value;

    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        genre: genreValue,
        author: authorValue,
        year: yearValue,
        item_type_id: itemTypeIDValue,
        patron_id: patronIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-library-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputGenre.value = '';
            inputAuthor.value = '';
            inputYear.value = '';
            inputItemTypeID.value = '';
            inputPatronID.value = '';
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
    let currentTable = document.getElementById("library-item-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 7 cells
    let row = document.createElement("TR");
    let itemIDCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let genreCell = document.createElement("TD");
    let authorCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let itemTypeIDCell = document.createElement("TD");
    let patronFirstCell = document.createElement("TD");
    let patronLastCell = document.createElement("TD");

    // Create a delete button for eacy data entry
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    itemIDCell.innerText = newRow.item_id;
    titleCell.innerText = newRow.title;
    genreCell.innerText = newRow.genre;
    authorCell.innerText = newRow.author;
    yearCell.innerText = newRow.year;
    itemTypeIDCell.innerText = newRow.item_type_id;
    patronFirstCell.innerText = newRow.patron_id;
    patronLastCell.innerTexxt = newRow.patron_id;

    // add an event handler for the delete button
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteLibraryItem(newRow.item_id);
    };

    // Add the cells to the row 
    row.appendChild(itemIDCell);
    row.appendChild(titleCell);
    row.appendChild(genreCell);
    row.appendChild(authorCell);
    row.appendChild(yearCell);
    row.appendChild(itemTypeIDCell);
    row.appendChild(patronFirstCell);
    row.appendChild(patronLastCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.item_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

     // Code for adding new data to the dropdown menu for library item
    
    // Find drop down menu, create a new option, fill data in the option,
    // then append option to drop down menu so newly created rows via ajax will be found in it
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.item_id;
    option.value = newRow.item_id;
    selectMenu.add(option);
    location.reload();

}