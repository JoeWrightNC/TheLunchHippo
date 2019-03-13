// src/lunchhippo.js

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet.  
        doc.getRows(1, { query: `slack="${user.user_id}"` }, function(err, rows) {
          const order = {
              order: rows[0].order,
              notes: rows[0].notes,
              total: rows[0].total
          }
          if(err) {
            console.log(err);
          }
          return resolve({
            text: `Your lunch order is: "${order.order}". The notes you've added are: "${order.notes}".  The total you've got down is: "${order.total}" While I got you, what do you call a hippo who wears glasses and listens to Morrisey? ... A Hip(po)ster hahahaha!`,
          })
        });
    }); 
})


module.exports = lunchHippoFactory