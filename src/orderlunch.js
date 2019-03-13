// src/lunchhippo.js

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');

var today = new Date();
var time = today.getHours();
var returnText = ""

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {

    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet.
        if (time < 21){
            doc.getRows(1, { query: `slack="${user.user_id}"` }, function(err, rows) {
                rows[0].order = user.text;
                rows[0].save();
                if(err) {
                    console.log(err);
                }
            });
            returnText = `Your lunch order is: "${user.text}".  Sounds like a good lunch to share with your friendly neighborhood hippo.`
        }
        else {
            returnText = "Sorry, but it's too late to place your order.  Join us next time though!"
        }
        return resolve({
            text: returnText,
        })
    });
})

module.exports = lunchHippoFactory