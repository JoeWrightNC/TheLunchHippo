// src/server.js

//gather the modules
const Express = require('express')
const bodyParser = require('body-parser')
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
const doc = new GoogleSpreadsheet('YOUR SPREADSHEET ID HERE');


//crank that server
const app = new Express()
app.use(bodyParser.urlencoded({extended: true}))

//configure environment
const {SLACK_TOKEN: slackToken, PORT} = process.env

if (!slackToken || !apiKey) {
  console.error('missing environment variables SLACK_TOKEN and/or REBRANDLY_APIKEY')
  process.exit(1)
}

const port = PORT || 80

//easily call our factories to work as we route
const hippostart = hippostartFactory()
const hippostop = hippostopFactory()
const hippoentree = hippoentreeFactory()
const hipponote = hipponoteFactory()
const hippototal = hippototalFactory()
const hippohelp = hippohelpFactory()
const hippocheck = hippocheckFactory()
const hippobreak = hippobreakFactory()
const hippomenu = hippomenuFactory()


app.post('/', (req, res) => {
    switch(req.body.command) {
        case "/hippostart":
            hippostart(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/hippostop":
            hippostop(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/hippoentree":
            hippoentree(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/hipponote":
            hipponote(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/hippototal":
            hippototal(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/hippohelp":
            hippohelp(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/hippocheck":
            hippocheck(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/hippobreak":
            hippobreak(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
        case "/hippomenu":
            hippomenu(req.body)
            .then((result) => {
            return res.json(result)
            })
            .catch(console.error)
            break;
    }
})

//say hello world, but more useful
app.listen(port, () => {
  console.log(`Server started at localhost:${port}`)
})