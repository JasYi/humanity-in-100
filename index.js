var express = require('express');
var hbs = require('hbs');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');

//PORT TO DIRECTOR FOR SQL TESTING

//form submits to seperate helper page which is defined in main js file which does the sql stuff then
//helper page then goes back to map page
//use cookie to limit ppl to one response per device
//login maybe with usename and password

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'static')));

//body parser setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//SQL setup
var sql_params = {
  connectionLimit : 10, //replace with info from the site
  user            : process.env.CLEARDB_DATABASE_USERNAME,
  password        : process.env.CLEARDB_DATABASE_PASSWORD,
  host            : process.env.CLEARDB_DATABASE_HOST,
  port            : process.env.CLEARDB_DATABASE_PORT,
  database        : process.env.CLEARDB_DATABASE_NAME
}

var pool = mysql.createPool(sql_params);

function findID(req, res, next){
    console.log('test 1');
  pool.query('SELECT id FROM stories ORDER BY id DESC', function(error, results, field){
    if(error){
        res.locals.id = results[0].id;
        throw error;
    }

    console.log(results[0].id);
    res.locals.id = results[0].id + 1;
    next();
  })
}

function addData(req, res, next){ //try to find way to load regular main page if no query and if there are queries then go into this one
  var name = req.body.name + "";
  var countryName = req.body.country.substring(2) + "";
  console.log(countryName.indexOf(","));
  countryName = countryName.substring(0, countryName.indexOf(",") - 1);
  var countryID = req.body.country;
  countryID = countryID.substring(countryID.indexOf("]")-3, countryID.indexOf(']') - 1);
  console.log(typeof countryID);
  var story = req.body.story + "";
  var id = res.locals.id + "";

  pool.query('INSERT INTO stories(id, p_name, country_id, country_name, message) VALUE (?, ?, ?, ?, ?)', [id, name, countryID, countryName, story], function(error, results, field){
    if(error) throw error;
    next()
  })
}

app.get('/', function(req, res){//figure out how to bypass query check when queries aren't there
    res.render('index');
})

app.get('/form', function(req, res){
  res.render('form');
})

app.post('/form_helper',findID, addData ,function(req, res, next){
  res.redirect('/');
})

var listener = app.listen(app.get('port'), function() {
  console.log( 'Express server started on port: '+listener.address().port );
});
