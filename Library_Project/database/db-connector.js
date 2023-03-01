// Citation for the following code:
// Date: 3/1/2023
// Copied from nodejs-starter-app with minor changes to reflect user/password info 
//Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_dsouzam',
    password        : '0829',
    database        : 'cs340_dsouzam'
})

// Export it for use in our applicaiton
module.exports.pool = pool;