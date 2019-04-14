// src/lunchhippo.js

const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');

const doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');

let returnText = ""

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {

    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet. find row of user
        doc.getRows(1, { query: `slack="${user.user_id}"` }, function(err, rows) {
            //make sure no false positives, that they have a row to write to, tell them to sign up if not
            if (rows === undefined || rows.length == 0) {
                returnText = "You have to join the lunch program first by typing /hippostart!";
                feedback(returnText);
            //else take their order
            } else {
                rows[0].order = user.text;
                rows[0].save();
                returnText = `Your lunch order is: "${user.text}".  Sounds like a good lunch to share with your friendly neighborhood hippo.`
                feedback(returnText)
            }
            if(err) {
                console.log(err);
            }
        });
    });
    function feedback(returnText) {
        return resolve({
            text: returnText,
        })
    }
})

module.exports = lunchHippoFactory