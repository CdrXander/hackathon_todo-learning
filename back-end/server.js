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
var databaseController 	= require('./databaseController.js');
var accountController 	= require('./accountController.js');


//Connect to DB
var conn = massive.connectSync({
	connectionString:config.connectString
});

app.set('db',conn);
var db = app.get('db');

//Authorization Middleware	=	=	=	=	=	=

var authCheck = function(req,res,next) {
	if(!!req.session.currentUser) {
		next()
	} else {
		res.status(401).send("You must be logged in to use this resource");
	}
}

//END POINTS	=	=	=	=	=	=	=	=	=

//security
app.post('/api/account/create', accountController.createAccount);
app.post('/api/auth/login', accountController.loginAccount);
app.post('/api/auth/logout', accountController.logoutAccount);
app.get('/api/auth/currentuser', accountController.getCurrentUser);

//Todo items
app.get('/api/todo/all', databaseController.getAllToDoItems)
app.get('/api/todo/list', authCheck, databaseController.getToDoItemsForUser);
app.post('/api/todo/create', authCheck, databaseController.createToDoItem);

//SPIN UP THE DRIVES!!
app.listen(port, function() {
  console.log("Started server on port", port, (new Date()).toTimeString());
});
