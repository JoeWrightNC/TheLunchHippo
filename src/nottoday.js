// src/lunchhippo.js

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet.
        doc.getRows(1, { query: `slack="${user.user_id}"` }, function(err, rows) {
          rows[0].order = "notToday";
          rows[0].save();
          if(err) {
            console.log(err);
          }
        });
        return resolve({
            text: `You've outed out of this particular lunch order, but you're still a part of the lunch program.  See you at the next lunch!`,
        })
    });
})

module.exports = lunchHippoFactory