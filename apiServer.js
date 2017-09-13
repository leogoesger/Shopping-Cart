var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

//import Controller
const cartController = require('./controllers/cartController');
const booksController = require('./controllers/booksController');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
//MONGO LAB
mongoose.connect('mongodb://testUser:test@ds135624.mlab.com:35624/bookshop')
//LOCALHOST
//mongoose.connect('mongodb://localhost:27017/bookshop');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '))
// -->>> SET UP SESSIONS <<<---
app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 *2}, // 2 days in milli seconds
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}))

//SESSION for Cart
app.post('/cart', cartController.cartCreate); // SAVE SESSION CART API
app.get('/cart', cartController.getCart); // GET SESSION CART API

app.post('/books', booksController.postBook); //Post Book
app.get('/books', booksController.getBooks); //Get Books
app.delete('/books/:_id', booksController.deleteBook); //Delete Book
app.put('/books/:_id', booksController.updateBook); //Update Book
app.get('/images', booksController.getImage); //Get Book's Image

app.listen(3001, function(err){
  if(err){
    return console.log(err)
  }
  console.log("API Server is listening on 3001")
})
