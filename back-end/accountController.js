var app = require('./server.js')
var crypto = require('crypto');

module.exports = {
	createAccount:createAccount,
	loginAccount:loginAccount,
	logoutAccount:logoutAccount,
	getCurrentUser:getCurrentUser
}

function generateSalt(length) {
	return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
}


function createAccount(req, res) {
	var db = app.get('db');

	var salt = generateSalt(20);
	var hash = crypto.createHmac('sha512', salt);
	hash.update(req.body.password);
	var passwordHash = hash.digest('hex');

	var account = {
		email: req.body.email,
		password:passwordHash,
		password_salt:salt
	};

	db.accounts.insert(account, function(err, newUser) {
		if(!err) {
			res.status(200).send(newUser);
		} else {
			res.status(500).send(newUser);
		}
	})
}


function loginAccount(req,res) {
	var db = app.get('db');

	var loginData = {
		email: req.body.email
	}
	db.accounts.find(loginData, function(err,result) {
		if(!err) {
			if(result.length < 1) {
				res.status(422).send("Incorrect email/password combination - email");
			} else {
				console.log(result[0]);
				var salt = result[0].password_salt;
				var hash = crypto.createHmac('sha512', salt);
				hash.update(req.body.password);
				var passwordHash = hash.digest('hex');

				if(passwordHash === result[0].password) {
					req.session.currentUser = result[0];
					res.status(200).send(req.session.currentUser);
				} else {
					res.status(422).send("Incorrect email/password combination - password");
				}
			}
		}
	})
}


function logoutAccount(req,res) {
	req.session.currentUser = null;
	res.status(200).send("User Logged Out");
}

function getCurrentUser(req,res) {
	if(!!req.session.currentUser) {
		res.status(200).send(req.session.currentUser);
	} else {
		res.status(422).send("No user is currently logged in");
	}
}
