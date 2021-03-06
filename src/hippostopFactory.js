// src/lunchhippo.js

const axios = require('axios')
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

const doc = new GoogleSpreadsheet('YOUR_SPREADSHEET_ID');


function addUser(user) {
    doc.useServiceAccountAuth(creds, function (err) {
      // Get all of the rows from the spreadsheet.  Query to find user
      doc.getRows(1, { query: `slack="${user.user_id}"` }, function(err, rows) {
        rows[0].del();
        if(err) {
          console.log(err);
        }
      });
    }); 
    //notify lunch admins of persons removal via slack
    var addUrl = `https://slack.com/api/chat.postMessage?token=xoxb-2173034834-568510280833-RhSjEUjRrlLiHyiUVrCWlxO2&channel=lunchadmin&text=Hey!%20Just%20a%20heads%20up%20that%20${user.user_name}%20has%20been%20removed%20from%20future%20lunch%20orders&as_user=TheLunchHippo&pretty=1`
    var postSignUp=axios.post(addUrl)
    postSignUp.then(() => {
        console.log("postSignUp Then Statement");
    })
    return postSignUp;
};


const lunchHippoFactory = () => (body) => new Promise((resolve, reject) => {
  addUser(body) 
    .then(() => {
      return resolve({
        text: `You have been removed from the Cary,NC lunch program.  This hippo will miss you.  If you want to come back and eat lunch sometime, just type /hippostart in any channel!`,
      })
    })
})


module.exports = lunchHippoFactory