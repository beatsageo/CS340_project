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
PORT = 9761;

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
app.get('/', function(req, res)
    {  
        let query1 = "SELECT * FROM Library_Items;";               // Define our queries

        let query2 = "SELECT * from Patrons;"

        let query3 = "SELECT * from Item_Types;"

        db.pool.query(query1, function(error, rows, fields){    // Execute the queries to create patron and item types dropdowns in Library_Items

            let library_items = rows;

            db.pool.query(query2, (error, rows, fields) => {

                let patrons = rows;

                db.pool.query(query3, (error, rows, fields) => {
            
                    let item_types = rows;
                    return res.render('index', {data: library_items, patrons: patrons, item_types: item_types});
                })                 
            })                 
        })                                                      
    });                                                         

app.post('/add-library-item-ajax', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let patron_id = parseInt(data.patron_id);
        if (isNaN(patron_id))
        {
            patron_id = 'NULL'
        }
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Library_Items (title, genre, author, year, item_type_id, patron_id) VALUES ('${data.title}', '${data.genre}', '${data.author}', '${data.year}', '${data.item_type_id}', ${patron_id})`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
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
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        })
    });

app.delete('/delete-library-item-ajax/', function(req,res,next){
        let data = req.body;
        let itemID = parseInt(data.item_id);
        let deleteLibrary_Item = `DELETE FROM Library_Items WHERE item_id = ?`;
      
      
              // Run the 1st query
              db.pool.query(deleteLibrary_Item, [itemID], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
      
                  else
                  {
                    res.sendStatus(204);
                  }
      })});

app.put('/put-library-item-ajax', function(req,res,next){
        let data = req.body;
      
        let item = parseInt(data.item_id);
        let patron = parseInt(data.patron_id);
        if (patron == NaN){
            patron = "NULL";
        }
        
        
      
        queryUpdatePatron = `UPDATE Library_Items SET patron_id = ? WHERE Library_Items.item_id = ?`;
        selectPatron = `SELECT * FROM Patrons WHERE patron_id = ?`
      
              // Run the 1st query
              db.pool.query(queryUpdatePatron, [patron, item], function(error, rows, fields){
                  if (error) {
      
                  // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                  console.log(error);
                  res.sendStatus(400);
                  }
      
                  // If there was no error, we run our second query and return that data so we can use it to update the people's
                  // table on the front-end
                  else
                  {
                      // Run the second query
                      db.pool.query(selectPatron, [patron], function(error, rows, fields) {
      
                          if (error) {
                              console.log(error);
                              res.sendStatus(400);
                          } else {
                              res.send(rows);
                          }
                      })
                  }
      })});

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});