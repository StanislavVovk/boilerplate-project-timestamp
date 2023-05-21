// index.js
// where your node app starts

// init project
const util = require('node:util');
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
    const date = req.params.date
    const checkDate = Date.parse(date)
    if (!date) return res.json({unix: Date.now(), utc: new Date(Date.now()).toUTCString()})
    if (isNaN(checkDate)) {
        if (isNaN(Number(date))) {
            res.json({error: "Invalid Date"})
        } else {
            res.json({
                unix: Number(date),
                utc: (new Date(Number(date))).toUTCString()
            })
        }
    } else {
        res.json({
            unix: Date.parse(date),
            utc: new Date(date),
        })
    }


})
app.get('/*', (req, res) => {
    res.json({'error': 'Invalid Date'})
})
// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
