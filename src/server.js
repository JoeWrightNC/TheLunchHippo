// src/server.js
const Express = require('express')
const bodyParser = require('body-parser')
const createShortUrlsFactory = require('./createShortUrls')
const slashCommandFactory = require('./slashCommand')
const lunchHippoFactory = require('./lunchhippo')
const lunchHippoLeaveFactory = require('./lunchhippoleave')
const orderLunchFactory = require('./orderlunch')
const addNoteFactory= require('./addnote')
const addTotalFactory = require('./addtotal')
const helpMeHippoFactory = require('./helpmehippo')
const checkOrderFactory = require('./checklunchorder')
const notTodayFactory = require('./nottoday')
const hippoMenuFactory = require('./hippomenu');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./client_secret.json');

var doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');


//sup


const app = new Express()
app.use(bodyParser.urlencoded({extended: true}))

const {SLACK_TOKEN: slackToken, REBRANDLY_APIKEY: apiKey, PORT} = process.env

if (!slackToken || !apiKey) {
  console.error('missing environment variables SLACK_TOKEN and/or REBRANDLY_APIKEY')
  process.exit(1)
}

const port = PORT || 80

const rebrandlyClient = createShortUrlsFactory(apiKey)
const slashCommand = slashCommandFactory(rebrandlyClient, slackToken)
const lunchHippo = lunchHippoFactory()
const lunchHippoLeave = lunchHippoLeaveFactory()
const orderLunch = orderLunchFactory()
const addNote = addNoteFactory()
const addTotal = addTotalFactory()
const helpmehippo = helpMeHippoFactory()
const checkorder = checkOrderFactory()
const nottoday = notTodayFactory()
const hippomenu = hippoMenuFactory()
app.post('/', (req, res) => {
    if(req.body.command == "/hippourl") {
        slashCommand(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippostart") {
        lunchHippo(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippostop") {
        lunchHippoLeave(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippoentree") {
        orderLunch(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hipponote") {
        addNote(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippototal") {
        addTotal(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippohelp") {
        helpmehippo(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippocheck") {
        checkorder(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippobreak") {
        nottoday(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippomenu") {
        hippomenu(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
})

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`)
})