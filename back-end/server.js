//Put the api server here//Node modules import
var express 	= require('express');
var session		= require('express-session')
var bodyParser 	= require('body-parser');
var massive		= require('massive');

var config 		= require('./config.js');

var port 		= config.port;

//Initialize, Export, and Configure the app
var app = module.exports = express();
app.use(bodyParser.json());
app.use(session({saveUninitialized: true, resave: false, secret: config.sessionSecret, cookie: {secure: false, httpOnly: false}}));
app.use(express.static(__dirname +'/public'));

//Local File modules AFTER app initialization
var databaseController = require('./databaseController.js');

//Connect to DB
var conn = massive.connectSync({
	connectionString:config.connectString
});

app.set('db',conn);
var db = app.get('db');

//Authorization Middleware	=	=	=	=	=	=



//END POINTS	=	=	=	=	=	=	=	=	=

app.get('/api/todo/list', databaseController.getAllToDoItems)

//SPIN UP THE DRIVES!!
app.listen(port, function() {
  console.log("Started server on port", port, (new Date()).toTimeString());
});
