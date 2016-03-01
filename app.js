var express = require('express');
var _ = require('lodash');
var app = express();
// var mongo = require('mongoskin');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test_app2')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var site = require('./site_controller');

// var db = mongoose.db(, {native_parser:true});

var mustacheExpress = require('mustache-express');
// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  age: Number
});

var User = mongoose.model('User', userSchema);
module.exports = User;

function userpost (req, res) {
  var newUser = User({
    name: req.body.name,
    username: req.body.name,
    age: Number(req.body.age)
  });

  newUser.save(function(err) {
    if (err) throw err; // handle error
    console.log(err);

    console.log('user saved...')
    res.render('index', {
      name: req.body.name,
      age: req.body.age
    });
  });
}

function userprofile (req, res) {

}

app.get('/', site.index);
app.post('/users', userpost);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
