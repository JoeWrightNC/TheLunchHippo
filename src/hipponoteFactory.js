// src/lunchhippo.js

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID');

var today = new Date();
var time = today.getHours();
var returnText = ""

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet. find one that matches user
        doc.getRows(1, { query: `slack="${user.user_id}"` }, function(err, rows) {
            //be sure we dont get false order confirmations, make sure they have a row to write to
            if (rows === undefined || rows.length == 0) {
                returnText = "You have to join the lunch program first by typing /hippostart!";
                feedback(returnText);
            //if exists, add that note
            } else {
                rows[0].notes = user.text;
                rows[0].save();
                returnText = `The notes for your lunch order are: "${user.text}". Pretty Hip(po).`;
                feedback(returnText);
            }
            if(err) {
                console.log(err);
            }
        });
        function feedback(returnText) {
            return resolve({
                text: returnText,
            })
        }
    });
})

module.exports = lunchHippoFactory