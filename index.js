var express = require('express');
var hbs = require('hbs');
var path = require('path');
var mysql = require('mysql');

//form submits to seperate helper page which is defined in main js file which does the sql stuff then
//helper page then goes back to map page

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'static')));

//SQL setup
var sql_params = {
  connectionLimit : 10, //replace with info from the site
  user            : 'b2335052490792',
  password        : 'c4e29ae3',
  host            : 'us-cdbr-east-03.cleardb.com',
}

app.get('/', function(req, res){
    res.render('index');
})

app.get('/form', function(req, res){
  res.render('form');
})

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});


mysql://

:
c4e29ae3
@
us-cdbr-east-03.cleardb.com
/heroku_24a377e027a75d5?reconnect=true
