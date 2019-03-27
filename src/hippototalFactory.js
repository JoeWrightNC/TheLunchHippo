// src/lunchhippo.js

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet. query to find row of user
        doc.getRows(1, { query: `slack="${user.user_id}"` }, function(err, rows) {
          //update total
          rows[0].total = user.text;
          rows[0].save();
          if(err) {
            console.log(err);
          }
        });
        return resolve({
            text: `The total you have for your order is: "${user.text}", but you don't have to pay it!  Thanks Samanage!`,
        })
    });
})

module.exports = lunchHippoFactory