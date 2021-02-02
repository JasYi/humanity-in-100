var express = require('express');
var hbs = require('hbs');
var path = require('path');

//form submits to seperate helper page which is defined in main js file which does the sql stuff then
//helper page then goes back to map page

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res){
    res.render('index');
})

app.get('/form', function(req, res){
  res.render('form');
})

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});
