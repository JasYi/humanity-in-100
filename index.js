var express = require('express');
var hbs = require('hbs');
var path = require('path');
var mysql = require('mysql');
var bodyParser = require('body-parser');
const { Pool, Client } = require('pg')

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


//postgreSQL setup
const pool = new Pool({
  user: 'wulsybzdvojhgv',
  host: 'ec2-67-202-63-147.compute-1.amazonaws.com',
  database: 'd2rve0f27u9c6m',
  password: '84abfd333b0d8b77f9feabab26ae262998d1b965ac2cdf6fb748fc92d4e65043',
  port: 5432,
})
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
const client = new Client({
  user: 'wulsybzdvojhgv',
  host: 'ec2-67-202-63-147.compute-1.amazonaws.com',
  database: 'd2rve0f27u9c6m',
  password: '84abfd333b0d8b77f9feabab26ae262998d1b965ac2cdf6fb748fc92d4e65043',
  port: 5432,
})
client.connect()
client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})


function findID(req, res, next){
    console.log('test 1');
    var results;
    const text = 'SELECT id FROM stories' //postgres query
    // callback
    client.query(text, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        results = res.rows;
      }
    })

    console.log(results[0]);
    res.locals.id = results[0] + 1;
    next();
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

  const text = 'INSERT INTO stories(ID, NAME, COUNTRYNAME, COUNTRYID, STORY) VALUES($1, $2, $3, $4, $5) RETURNING *' //postgres query
  var values = [id, name, countryName, countryID, story];
  // callback
  client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])
    }
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
