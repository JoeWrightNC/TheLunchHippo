// src/lunchhippo.js

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID');
var sheetIndex = 0;

var returnText ="\n"

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {

    doc.useServiceAccountAuth(creds, function (err) {
        // Get the value of the cell for restaurant field, we're going to match those in an if statement
        // we're going to determine what sheetIndex to pass the menu skimmer, 
        //think of it as assigning which db table to read
        doc.getCells(2, { "min-row": 2, "max-row":2, "min-col": 3, "max-col": 3, "return-empty": true }, function(err, cells) {
            const restaurant = cells[0]._value;
            //2.0 lets go switch
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
            //Parse the returned rows into a well formated slack message that looks like a menu
            doc.getRows(sheetIndex, function(err, menu){
                for(var i = 0; i < menu.length; i++) {
                    var menuJSON = menu[i];
                    var menuLine = `*${menuJSON.item}*\n${menuJSON.description}\n${menuJSON.price}\n\n`;
                    returnText += menuLine;
                } 
                //send the super long menu string to the chat
                responder(returnText)
                if(err) {
                    console.log(err);
                }
            })
        });
    });
    function responder(response) {
        //this is important, reset that var, the data is passed in the function object so we good.
        returnText ="\n"
        return resolve({
            text: response,
        })
    }
})

module.exports = lunchHippoFactory