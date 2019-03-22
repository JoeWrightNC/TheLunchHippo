// src/lunchhippo.js

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');
var sheetIndex = 0;

var returnText ="\n"

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {

    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet.
        doc.getCells(2, { "min-row": 2, "max-row":2, "min-col": 3, "max-col": 3, "return-empty": true }, function(err, cells) {
            const restaurant = cells[0]._value;
            if (restaurant=="Ruckus") {
                sheetIndex = 4
            } 
            else if (restaurant == "Panera") {
                sheetIndex = 3
            }
            else if (restaurant == "Enrigo") {
                sheetIndex = 5
            }
            else if (restaurant == "Jasons") {
                sheetIndex = 6
            }
            else if (restaurant == "Tazikis") {
                sheetIndex = 7
            }
            if(err) {
                console.log(err);
            }
            doc.getRows(sheetIndex, function(err, menu){
                for(var i = 0; i < menu.length; i++) {
                    var menuJSON = menu[i];
                    var menuLine = `*${menuJSON.item}*\n${menuJSON.description}\n${menuJSON.price}\n\n`;
                    returnText += menuLine;
                } 
                responder(returnText)
                if(err) {
                    console.log(err);
                }
            })
        });
    });
    function responder(response) {
        return resolve({
            text: response,
        })
    }
})

module.exports = lunchHippoFactory