// Citation for the following code:
// Date: 3/1/2023
// Adapted from nodejs-starter-app with changes to apply to my database application
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteHold(holdID) {
    
    // Put our data we want to send in a javascript object
    let data = {
        hold_id: holdID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-hold-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            console.log("ready");
            // Add the new data to the table
            deleteRow(holdID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

function deleteRow(holdID){
    let table = document.getElementById("holds-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows to find row with matching hold id and remove that row
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == holdID) {
            table.deleteRow(i);
            break;
       }
    }

    // reload page to update dropdown menu
    location.reload();
}