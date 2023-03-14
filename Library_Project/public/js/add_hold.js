// Citation for the following code:
// Date: 3/1/2023
// Adapted from nodejs-starter-app with changes to apply to my database application
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addHoldForm = document.getElementById('add-hold-form-ajax');

// Modify the objects we need
addHoldForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-patron_id");
    let inputTitle = document.getElementById("input-library_items");
    console.log(inputTitle);

    // Get the values from the form fields
    let patronValue = inputName.value;
    let titleValue = inputTitle.value;
    console.log(patronValue);
    console.log(titleValue);
    
    let format_date = new Date().toISOString().slice(0, 19).replace('T', ' ').replace('Z', '0');

    // Put our data we want to send in a javascript object
    let data = {
        item_id: titleValue,  //Library Item ID
        patron_id: patronValue,  //Patron ID
        queue_position: "1",
        hold_date: format_date,
    }
    console.log(data);
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-hold-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputTitle.value = '';
            
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Holds
addRowToTable = (data) => {
    console.log('add to row data');
    console.log(data);
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("holds-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    console.log(parsedData);
    let newRow = parsedData[parsedData.length - 1]
    console.log('newrow data');
    console.log(newRow);
    
    // Create a row and 6 cells
    let row = document.createElement("TR");
    let holdIDCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let holdDateCell = document.createElement("TD");
    let queuePositionCell = document.createElement("TD");

    // Create a delete button for eacy data entry
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    holdIDCell.innerText = newRow.hold_id;
    firstNameCell.innerText = newRow.first_name;
    lastNameCell.innerText = newRow.last_name;
    titleCell.innerText = newRow.title;
    holdDateCell.innerText = newRow.hold_date;
    queuePositionCell.innerText = newRow.queue_position;

    // add an event handler for the delete button
    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteHold(newRow.hold_id);
    };

    // Add the cells to the row 
    row.appendChild(holdIDCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    console.log(titleCell.innerText);
    row.appendChild(titleCell);
    console.log(holdDateCell);
    row.appendChild(holdDateCell);
    row.appendChild(queuePositionCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.hold_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

     // Reload page to update dropdown menu
     location.reload(true);

}