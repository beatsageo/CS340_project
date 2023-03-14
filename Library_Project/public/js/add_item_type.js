// Citation for the following code:
// Date: 3/1/2023
// Adapted from nodejs-starter-app with changes to apply to my database application
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addItemTypeForm = document.getElementById('add-item-type-form-ajax');

// Modify the objects we need
addItemTypeForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputType = document.getElementById("input-type");
    let inputCheckoutLength = document.getElementById("input-checkout-length");
    let inputFinePerDay = document.getElementById("input-fine-per-day");

    // Get the values from the form fields
    let typeValue = inputType.value;
    let checkOutLengthValue = inputCheckoutLength.value;
    let finePerDayValue = inputFinePerDay.value;

    // Put our data we want to send in a javascript object
    let data = {
        type: typeValue,
        check_out_length: checkOutLengthValue,
        fine_per_day: finePerDayValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-item-type-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputType.value = '';
            inputCheckoutLength.value = '';
            inputFinePerDay.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Item_Types
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("item-types-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let itemTypeIDCell = document.createElement("TD");
    let typeCell = document.createElement("TD");
    let checkOutLengthCell = document.createElement("TD");
    let finePerDayCell = document.createElement("TD");

    // Create a delete button for eacy data entry
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    itemTypeIDCell.innerText = newRow.item_type_id;
    typeCell.innerText = newRow.type;
    checkOutLengthCell.innerText = newRow.check_out_length;
    finePerDayCell.innerText = newRow.fine_per_day;

    // add an event handler for the delete button
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteLibraryItem(newRow.item_type_id);
    };

    // Add the cells to the row 
    row.appendChild(itemTypeIDCell);
    row.appendChild(typeCell);
    row.appendChild(checkOutLengthCell);
    row.appendChild(finePerDayCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.item_type_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Code to add data to the dropdown menu
    
    // Update dropdown
    location.reload(true);
}