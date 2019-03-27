// src/server.js

//gather the modules
const Express = require('express')
const bodyParser = require('body-parser')
const createShortUrlsFactory = require('./createShortUrls')
const hippourlFactory = require('./hippourlFactory')
const hippostartFactory = require('./hippostartFactory')
const hippostopFactory = require('./hippostopFactory')
const hippoentreeFactory = require('./hippoentreeFactory')
const hipponoteFactory= require('./hipponoteFactory')
const hippototalFactory = require('./hippototalFactory')
const hippohelpFactory = require('./hippohelpFactory')
const hippocheckFactory = require('./hippocheckFactory')
const hippobreakFactory = require('./hippobreakFactory')
const hippomenuFactory = require('./hippomenuFactory');
const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');
const doc = new GoogleSpreadsheet('1EK44HOjD7FPy5KlWmmtPytC9LODhJEhTh9bgiuYmDx0');


//crank that server
const app = new Express()
app.use(bodyParser.urlencoded({extended: true}))

//configure environment
const {SLACK_TOKEN: slackToken, REBRANDLY_APIKEY: apiKey, PORT} = process.env

if (!slackToken || !apiKey) {
  console.error('missing environment variables SLACK_TOKEN and/or REBRANDLY_APIKEY')
  process.exit(1)
}

const port = PORT || 80

//easily call our factories to work as we route
const rebrandlyClient = createShortUrlsFactory(apiKey)
const hippourl = hippourlFactory(rebrandlyClient, slackToken)
const hippostart = hippostartFactory()
const hippostop = hippostopFactory()
const hippoentree = hippoentreeFactory()
const hipponote = hipponoteFactory()
const hippototal = hippototalFactory()
const hippohelp = hippohelpFactory()
const hippocheck = hippocheckFactory()
const hippobreak = hippobreakFactory()
const hippomenu = hippomenuFactory()

//Its like a switch case, but you know, messier.
//Clean up in 2.0, routes grew more than expected in MVP
app.post('/', (req, res) => {
    if(req.body.command == "/hippourl") {
        hippourl(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippostart") {
        hippostart(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippostop") {
        hippostop(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippoentree") {
        hippoentree(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hipponote") {
        hipponote(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippototal") {
        hippototal(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippohelp") {
        hippohelp(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippocheck") {
        hippocheck(req.body)
        .then((result) => {
        return res.json(result)
        })
        .catch(console.error)
    }
    else if(req.body.command == "/hippobreak") {
        hippobreak(req.body)
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

//say hello world, but more useful
app.listen(port, () => {
  console.log(`Server started at localhost:${port}`)
})