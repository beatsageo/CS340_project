// Citation for the following code:
// Date: 3/1/2023
// Adapted from nodejs-starter-app with changes to apply to my database application
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updatePatronForm = document.getElementById('update-patron-form-ajax');

// Modify the objects we need
updatePatronForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPatronID = document.getElementById("mySelect");
    let inputFine = document.getElementById("input-fine-update");

    // Get the values from the form fields
    let patronIDValue = inputPatronID.value;
    let fineValue = inputFine.value;


    // Put our data we want to send in a javascript object
    let data = {
        patron_id: patronIDValue,
        fine: fineValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-patron-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            
            // Add the new data to the table
            updateRow(data, patronIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    
    function updateRow(data, patronID){
    
        let table = document.getElementById("patrons-table");

        for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == patronID) {

                // Get the location of the row where we found the matching patronID
                let updateRowIndex = table.getElementsByTagName("tr")[i];

                // Get td of fine
                let td = updateRowIndex.getElementsByTagName("td")[3];

                // Reassign fine value
                td.innerHTML = data.fine;
        }
        }
    }

})