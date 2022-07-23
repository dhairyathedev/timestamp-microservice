// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  if(!Date.parse(req.params.date) && !Number(req.params.date))
  {
    return res.send({error: "Invalid Date"});
  }


  if(!(/[-]/.test(req.params.date)) && Number(req.params.date))
  {

    return res.send({
      unix: new Date(req.params.date).getTime(),
      utc: new Date(req.params.date).toUTCString()
    });
  } 



  let result = {
    unix: new Date(req.params.date).getTime(),
    utc: new Date(req.params.date).toUTCString()
  }

  res.status(200).send(result);
});



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
