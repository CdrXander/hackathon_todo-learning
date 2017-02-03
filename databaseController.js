var app = require('./server.js');

module.exports = {
	getAllToDoItems:getAllToDoItems
}

function getAllToDoItems(req, res) {
	var db = app.get('db');
	
	db.run("SELECT * FROM todo_items", function(err, result) {
		if(!err) {
			res.status(200).send(result);
		} else {
			console.log(err);
			res.status(500).send(err);
		}
	})
}