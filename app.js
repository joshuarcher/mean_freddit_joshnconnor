var express = require('express');
var _ = require('lodash');
var app = express();
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/test_app', {native_parser:true});

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

db.bind('users').bind({
  insertUser: function(name, age, callback) {
    this.insert({
      name: name,
      age: age
    }, callback);
  }
});

function homepage (req, res) {
  res.render('index', {
    name: "josh",
    age: 21,
    word: "word"
  });
}

function userpost (req, res) {
  // db.bind('users').insert({
  //   name: req.body.name,
  //   age: req.body.age
  // });
  db.users.insertUser(req.body.name, req.body.age,
    function(err, user) {
      console.log(user.insertedIds[0]);
      console.log(user._id);
      res.render('index', {
        name: req.body.name,
        age: req.body.age
      })
    });
  // res.render('index', {
  //   name: req.body.name,
  //   age: req.body.age
  // })
}

function userprofile (req, res) {

}

app.get('/', homepage);
app.post('/users', userpost);
app.get('/users/:id', userprofile);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
