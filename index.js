// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  const unixTimestampRegex = /^\d{10,13}$/;
  const dateObj = isNaN(date) ? new Date(date) : new Date(parseInt(date));
  if (!date || date === '') {
    const now = new Date();
    res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
  } else if (!isNaN(dateObj.getTime())) {
    res.json({
      unix: dateObj.getTime(),
      utc: dateObj.toUTCString(),
    });
  } else {
    res.json({ error: "Invalid date" });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
