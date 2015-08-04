var mysql	= require("mysql");
var md5		= require('md5');

module.exports.controller = function(req, res) {
	res.json({"Message" : "USERS controller"});
	return;
};

module.exports.list = function(req, res, connection) {
	var query = "SELECT * FROM ??";
	var table = ["user_login"];
	query = mysql.format(query, table);
	connection.query(query,function(err,rows){
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query - /users/list/GET"});
		} else {
			res.json({"Error" : false, "Message" : "Success", "Users" : rows});
		}
	});
};

module.exports.retrieve = function(req, res, connection) {
	var query = "SELECT * FROM ?? WHERE ??=?";
	var table = ["user_login", "user_id", req.params.user_id];
	query = mysql.format(query, table);
	connection.query(query,function(err,rows) {
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query - /users/{id}/GET"});
		} else {
			res.json({"Error" : false, "Message" : "Success", "Users" : rows});
		}
	});
};

module.exports.insert = function(req, res, connection) {
	var query = "INSERT INTO ??(??,??) VALUES (?,?)";
	var table = ["user_login", "user_email", "user_password", req.body.email, md5(req.body.password)];
	query = mysql.format(query, table);
	connection.query(query,function(err, rows) {
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query - possible duplicate user - /users/POST"});
		} else {
			res.json({"Error" : false, "Message" : "User Added !"});
		}
	});
};

module.exports.update = function(req, res, connection) {
	var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
	var table = ["user_login", "user_password", md5(req.body.password), "user_email", req.body.email];
	query = mysql.format(query, table);
	connection.query(query,function(err,rows) {
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query - /users/PUT"});
		} else {
			res.json({"Error" : false, "Message" : "Updated the password for email " + req.body.email});
		}
	});
};

module.exports.delete = function(req, res, connection) {
	var query = "DELETE from ?? WHERE ??=?";
	var table = ["user_login", "user_email", req.params.email];
	query = mysql.format(query, table);
	connection.query(query,function(err, rows) {
		if(err) {
			res.json({"Error" : true, "Message" : "Error executing MySQL query - /users/{email}/DELETE"});
		} else {
			res.json({"Error" : false, "Message" : "Deleted the user with email " + req.params.email});
		}
	});
};
