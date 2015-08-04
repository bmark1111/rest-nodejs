var md5 = require('md5');

var userModel = require('../models/user');

function userController(req, res) {
	var self = this;

	self.init(req, res);
};

userController.prototype.init = function(req, res) {
	var self = this;

	self.req = req;
	self.res = res;
};

userController.prototype.list = function() {
	var self = this;

	var user = new userModel();
	user.list(
		function(data)
		{
			self.res.json({"Error" : false, "Message" : "Success", "Users" : data});
		});
};

userController.prototype.retrieve = function() {
	var self = this;

	var user = new userModel();
	user.retrieve(self.req.params.user_id,
		function(data)
		{
			self.res.json({"Error" : false, "Message" : "Success", "Users" : data});
		});
//	var query = "SELECT * FROM ?? WHERE ??=?";
//	var table = ["user_login", "user_id", self.req.params.user_id];
//	query = mysql.format(query, table);
//	self.connection.query(query,function(err,rows) {
//		if(err) {
//			self.res.json({"Error" : true, "Message" : "Error executing MySQL query - /users/{id}/GET"});
//		} else {
//			self.res.json({"Error" : false, "Message" : "Success", "Users" : rows});
//		}
//	});
};

userController.prototype.create = function() {
	var self = this;

	var user = new userModel();
	self.req.body.password = md5(self.req.body.password);
	user.create(self.req.body,
		function(data)
		{
			self.res.json({"Error" : false, "Message" : "User Added !"});
		});
//	var query = "INSERT INTO ??(??,??) VALUES (?,?)";
//	var table = ["user_login", "user_email", "user_password", self.req.body.email, md5(self.req.body.password)];
//	query = mysql.format(query, table);
//	self.connection.query(query,function(err, rows) {
//		if(err) {
//			self.res.json({"Error" : true, "Message" : "Error executing MySQL query - possible duplicate user - /users/POST"});
//		} else {
//			self.res.json({"Error" : false, "Message" : "User Added !"});
//		}
//	});
};

userController.prototype.update = function() {
	var self = this;

	var user = new userModel();
//console.log(self.req);return;
	self.req.body.password = md5(self.req.body.password);
	user.update(self.req.body,
		function(data)
		{
			self.res.json({"Error" : false, "Message" : "Updated the password for email " + self.req.body.email});
		});
//	var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
//	var table = ["user_login", "user_password", md5(self.req.body.password), "user_email", self.req.body.email];
//	query = mysql.format(query, table);
//	self.connection.query(query,function(err,rows) {
//		if(err) {
//			self.res.json({"Error" : true, "Message" : "Error executing MySQL query - /users/PUT"});
//		} else {
//			self.res.json({"Error" : false, "Message" : "Updated the password for email " + self.req.body.email});
//		}
//	});
};

userController.prototype.delete = function() {
	var self = this;

	var user = new userModel();
console.log(self.req);return;
//	var query = "DELETE from ?? WHERE ??=?";
//	var table = ["user_login", "user_email", self.req.params.email];
//	query = mysql.format(query, table);
//	self.connection.query(query,function(err, rows) {
//		if(err) {
//			self.res.json({"Error" : true, "Message" : "Error executing MySQL query - /users/{email}/DELETE"});
//		} else {
//			self.res.json({"Error" : false, "Message" : "Deleted the user with email " + self.req.params.email});
//		}
//	});
};

module.exports = userController;
