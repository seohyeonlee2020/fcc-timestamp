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
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//input in yyyy-mm-dd format
app.get("/api/:year-:month-:day", function (req, res) {
  //destrcture input (req.params) into year, month, day
  const {year, month, day} = req.params;
  //create date object from params
  const date = new Date(`${year}-${month}-${day}`)
  //check validity
  if (isNaN(date)){
    res.json({"error": "invalid date"});
  }
  else{
  //send back unix, utc format
  res.json({
    "unix": date.getTime(),
    "utc": date.toUTCString()
  });
}
});

app.get("/api/:unixdate", function (req, res){
  //take unix date and turn into right type
  // {"unixdate":"1451001600000"}
  const unixDate = Number(req.params.unixdate);
  //console.log('unixDate', unixDate, typeof unixDate);
  //create date object
  const date = new Date(unixDate);
  //console.log('date', date);
  //check validity 
  if (isNaN(date)){
    return res.json({"error": "invalid date"});
  } 
  //send back unix and utc as json
  res.json({
    "unix": unixDate, 
    "utc": date.toUTCString()
  });
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
