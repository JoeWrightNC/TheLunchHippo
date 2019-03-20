// src/lunchhippo.js

const axios = require('axios')
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');


function addUser(user) {
    doc.useServiceAccountAuth(creds, function (err) {
        doc.getRows(1, { query: `slack="${user.user_id}"` }, function(err, rows) {
            if (rows === undefined || rows.length == 0) {
              var tempUserName = user.user_name.replace(".", " ");
              const toTitleCase = (phrase) => {
                return phrase
                  .toLowerCase()
                  .split(' ')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ');
              };
              let userName = toTitleCase(tempUserName);
                doc.addRow(1, { Slack: user.user_id, Name: userName, Participating: "Yes" }, function(err) {
                    if(err) {
                        console.log(err);
                    }
                }); 
            }
            if(err) {
              console.log(err);
            }
          });
        
    }); 
    var addUrl = `https://slack.com/api/chat.postMessage?token=xoxb-2173034834-568510280833-RhSjEUjRrlLiHyiUVrCWlxO2&channel=UCW2TG8F9&text=Hey!%20Just%20letting%20you%20know%20that%20${userName}%20has%20been%20added%20to%20the%20lunch%20program&as_user=TheLunchHippo&pretty=1`
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
        text: `You are opted in to the Cary,NC lunch program!  To order lunch, type /hippoorder then the order.  To add notes including what side you want or special instructions, type /hipponote then the note.  If you want to know more about me and all I can do to help you, type /hippohelp !  FYI, you can use my commands in any channel and the conversation will just stay between us`,
      })
    })
})


module.exports = lunchHippoFactory