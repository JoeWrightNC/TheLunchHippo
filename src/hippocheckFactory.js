// src/lunchhippo.js

var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');

//we've got jokes.  Specifically, an array of random jokes we'll be telling our end users to make this more fun
var hippoCheckReponses = [
  "While I got you, what do you call a hippo who wears glasses and listens to Morrisey? ... A Hip(po)ster hahahaha!",
  "I've been wondering... What if soy milk is just normal milk introducing itself in Spanish??",
  "Hey, while we're chatting, do you know why the sesame seed couldn't leave the casino??  BECAUSE HE WAS ON A ROLL lol.",
  "Hopefully it won't be like the last lunch you ordered with that nosey pepper in it.  It was jalapeno business.",
  "What's the difference between a hippo and a Zippo??  One is really heavy, the other is a little lighter!",
  "Why don't you ever see hippos hiding in trees???  Because we're really good at it.",
  "I was thinking I'd probably head downtown this weekend.  Too big for an Uber, so taking the hippopotabus."
]

const lunchHippoFactory = () => (user) => new Promise((resolve, reject) => {
    doc.useServiceAccountAuth(creds, function (err) {
        // Get all of the rows from the spreadsheet.  find theirs, read the order back to them
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
            text: `Your lunch order is: "${order.order}". The notes you've added are: "${order.notes}".  The total you've got down is: "${order.total}".  ${hippoCheckReponses[Math.floor(Math.random() * Math.floor(hippoCheckReponses.length))]}`,
          })
        });
    }); 
})


module.exports = lunchHippoFactory