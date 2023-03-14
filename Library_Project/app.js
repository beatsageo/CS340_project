// Citation for the following code:
// Date: 3/1/2023
// Adapted from nodejs-starter-app with changes to apply to my database application
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 9500;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/

// GET REQUESTS TO DISPLAY DATA IN A TABLE FOR EACH ENTITY

// To display Homepage
app.get('/', function(req, res) {  
    return res.render('index');                                                                    
});

// To display Library Items
app.get('/library_items', function(req, res) {  
    // Define queries
    let query1 = "Select item_id, title, genre, author, year, type, first_name, last_name from Library_Items LEFT JOIN Patrons ON Library_Items.patron_id = Patrons.patron_id LEFT JOIN Item_Types on Library_Items.item_type_id = Item_Types.item_type_id;";
    let query2 = "SELECT * from Patrons;"
    let query3 = "SELECT * from Item_Types;"
    
    db.pool.query(query1, function(error, rows, fields){    // Execute the queries to create patron and item types dropdowns in Library_Items
        let library_items = rows;
        db.pool.query(query2, (error, rows, fields) => {
            let patrons = rows;
            db.pool.query(query3, (error, rows, fields) => {
                let item_types = rows;
                return res.render('library_items', {data: library_items, patrons: patrons, item_types: item_types});
            })                 
        })                 
    })               
});

// To display Item Types
app.get('/item_types', function(req, res) {  
    let query1 = "SELECT * FROM Item_Types;";               // Define our queries
    db.pool.query(query1, function(error, rows, fields){    // Execute the queries to create table for Item Types
        let item_types = rows;
        return res.render('item_types', {data: item_types});
    })                                                                                     
});

// To display Patrons
app.get('/patrons', function(req, res) {  
    let query1 = "SELECT * FROM Patrons;";               // Define our queries
    db.pool.query(query1, function(error, rows, fields){    // Execute the queries to display Patrons
        let patrons = rows;
        return res.render('patrons', {data: patrons});
    })                                                                                     
});

// To display holds
app.get('/holds', function(req, res){  
    // Define our queries
    let query1 = "Select hold_id, first_name, last_name, title, hold_date, queue_position from Holds LEFT JOIN Patrons ON Patrons.patron_id = Holds.patron_id LEFT JOIN Library_Items on Library_Items.item_id = Holds.item_id;";               
    let query2 = "SELECT * from Patrons;"
    let query3 = "SELECT * from Library_Items;"
    
    db.pool.query(query1, function(error, rows, fields){    // Execute the queries to display holds
        let holds = rows;
        db.pool.query(query2, (error, rows, fields) => {
            let patrons = rows;
            db.pool.query(query3, (error, rows, fields) => {
                let library_items = rows;
                return res.render('holds', {data: holds, patrons: patrons, library_items: library_items});
            })                 
        })                 
    })               
});

// POST REQUESTS TO ADD DATA TO AN ENTITY

// Add a Library Item
app.post('/add-library-item-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let patron_id = parseInt(data.patron_id);
    if (isNaN(patron_id)) {patron_id = 'NULL'}

    // Create the query and run it on the database
    query1 = `INSERT INTO Library_Items (title, genre, author, year, item_type_id, patron_id) VALUES ('${data.title}', '${data.genre}', '${data.author}', '${data.year}', '${data.item_type_id}', ${patron_id})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Library_Items
            query2 = `SELECT * FROM Library_Items;`;
            db.pool.query(query2, function(error, rows, fields){
                // If there was an error on the second query, send a 400
                if (error) {

                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {res.send(rows);}
            })
        }
    })
});

// Add a Hold

app.post('/add-hold-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Holds (patron_id, item_id, queue_position, hold_date) VALUES ('${data.patron_id}', '${data.item_id}', '${data.queue_position}', '${data.hold_date}')`;
    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            console.log("error from add-hold-ajax")
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Holds
            query2 = `SELECT * FROM Holds;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Add a patron
app.post('/add-patron-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Patrons (first_name, last_name, fine) VALUES ('${data.first_name}', '${data.last_name}', '${data.fine}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Patrons
            query2 = `SELECT * FROM Patrons;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Add an item type
app.post('/add-item-type-ajax', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Item_Types (type, check_out_length, fine_per_day) VALUES ('${data.type}', '${data.check_out_length}', '${data.fine_per_day}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Item_Types
            query2 = `SELECT * FROM Item_Types;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


// DELETE REQUESTS TO REMOVE DATA FOR AN ENTITY
    
// Delete a library item
app.delete('/delete-library-item-ajax/', function(req,res,next){

    // Pull item_id of item to delete
    let data = req.body;
    let itemID = parseInt(data.item_id);

    // Create query
    let deleteLibrary_Item = `DELETE FROM Library_Items WHERE item_id = ?`; 
    
    // Run the query
    db.pool.query(deleteLibrary_Item, [itemID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        else {
            // successful delete, send back a 204 response code to indicate this
            res.sendStatus(204);
        }
})});

// Delete a hold
app.delete('/delete-hold-ajax/', function(req,res,next){

    // Pull hold_id of hold to delete
    let data = req.body;
    let holdID = parseInt(data.hold_id);

    // Create SQL query
    let deleteHold = `DELETE FROM Holds WHERE hold_id = ?`;


    // Run the query
    db.pool.query(deleteHold, [holdID], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }

        else
        {
        // Delete was successful, send a 204 HTTP Response
        res.sendStatus(204);
        }
})});

// PUT REQUESTS TO UPDATE DATA FOR AN ENTITY

// Update fine of a patron
app.put('/put-patron-ajax', function(req,res,next){
        
    // find new fine to update to and associated patron_id
    let data = req.body;
    let patron = parseInt(data.patron_id);
    let fine = parseInt(data.fine);

    // create query
    let queryUpdateFine = `UPDATE Patrons SET fine = ? WHERE Patrons.patron_id = ?`;
    
    // Run the query
    db.pool.query(queryUpdateFine, [fine, patron], function(error, rows, fields){
        if (error) {
      
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }
            
            // If there was no error, send back the updated rows after changing the fine
            else
            {
                res.send(rows);
            }
        })
    });

// Update location of a library item (by changing patron_id)
app.put('/put-library-item-ajax', function(req,res,next){
    
    // Pull item_id of library_item and new patron_id
    let data = req.body;
    let item = parseInt(data.item_id);
    let patron = parseInt(data.patron_id);
        
    // if patron is NULL, then set patron_id to NULL
    if(!patron){

        //create query
        queryUpdatePatron = `UPDATE Library_Items SET patron_id = NULL WHERE Library_Items.item_id = ?`;

        //run query
        db.pool.query(queryUpdatePatron, [item], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            res.sendStatus(400);
            }

            // If there was no error, we run our second query and return that data so we can use it to update the
            // table on the front-end
            else
            {
                res.send(rows);
            }
        })
        
        
    } else{

        // create queries
        queryUpdatePatron = `UPDATE Library_Items SET patron_id = ? WHERE Library_Items.item_id = ?`;
        selectPatron = `SELECT * FROM Patrons WHERE patron_id = ?`
      
              // Run the 1st query
              db.pool.query(queryUpdatePatron, [patron, item], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
      
                  // If there was no error, we run our second query and return that data so we can use it to update the
                  // table on the front-end
                  else
                  {
                      // Run the second query
                      db.pool.query(selectPatron, [patron], function(error, rows, fields) {
      
                          if (error) {
                            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                            console.log(error);
                            res.sendStatus(400);
                          } else {
                            // successful update, send back updated rows
                            res.send(rows);
                          }
                      })
                  }
      })
    }
});

// Update queue position of a hold
app.put('/put-hold-ajax', function(req,res,next){

    // pull hold_id and new queue_position
    let data = req.body;
    let hold = parseInt(data.hold_id);
    let position = parseInt(data.queue_position);

    // create query to perform update
    queryUpdateHold = `UPDATE Holds SET queue_position = ? WHERE Holds.hold_id = ?`;

            // Run the query
    db.pool.query(queryUpdateHold, [position, hold], function(error, rows, fields){
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the
        // table on the front-end
        else{
            res.send(rows);
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});