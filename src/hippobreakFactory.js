// src/lunchhippo.js

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID');

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet. find the user, set the not today text.
        doc.getRows(1, { query: `slack="${user.user_id}"` }, function(err, rows) {
          rows[0].order = "Not Ordering Today";
          rows[0].notes = "";
          rows[0].total = "";
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