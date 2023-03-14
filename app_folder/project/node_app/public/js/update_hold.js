/*
Citation for the following code:
Date: 3/1/2023
Adapted from nodejs-starter-app with changes to apply to my database application
Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
*/

// Get the objects we need to modify
let updateHoldsQueueForm = document.getElementById('update-hold-queue-form-ajax');

// Modify the objects we need
updateHoldsQueueForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputHoldID = document.getElementById('input-hold_id');
    let inputQueuePosition = document.getElementById('input-queue_position');

    // Get the values from the form fields
    let holdIDValue = inputHoldID.value;
    let QueuePositionValue = inputQueuePosition.value;

    // Put our data we want to send in a javascript object
    let data = {
        hold_id: holdIDValue,
        queue_position: QueuePositionValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-hold-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(data, holdIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, holdID){

    let table = document.getElementById("holds-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == holdID) {

            // Get the location of the row where we found the matching hold_id
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of queue_position
            let td1 = updateRowIndex.getElementsByTagName("td")[5];
            console.log(td1);

            // Reassign hold_id to our value we updated queue_position to
            td1.innerHTML = data.queue_position;
            console.log(data.queue_position);
       }
    }  

    location.reload(true);
    
}