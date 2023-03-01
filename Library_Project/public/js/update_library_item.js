// Citation for the following code:
// Date: 3/1/2023
// Adapted from nodejs-starter-app with changes to apply to my database application
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateLibraryItemForm = document.getElementById('update-library-item-form-ajax');

// Modify the objects we need
updateLibraryItemForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputItemID = document.getElementById("mySelect");
    let inputPatronID = document.getElementById("input-patron_id-update");

    // Get the values from the form fields
    let itemIDValue = inputItemID.value;
    let patronIDValue = inputPatronID.value;


    // Put our data we want to send in a javascript object
    let data = {
        item_id: itemIDValue,
        patron_id: patronIDValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-library-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, itemIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, itemID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("library-item-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == itemID) {

            // Get the location of the row where we found the matching item_id
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of patron_id
            let td = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign patron_id to our value we updated to
            td.innerHTML = parsedData[0].patron_id; 
       }
    }
}
