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
			self.res.json({"Success" : 1, "Message" : "Success", "Users" : data});
		},
		function(err)
		{
			self.res.json({"Success" : 0, "Message" : err.message, "Error" : err});
		});
};

userController.prototype.retrieve = function() {
	var self = this;

	var user = new userModel();
	user.retrieve(self.req.params.user_id,
		function(data)
		{
			self.res.json({"Success" : 1, "Message" : "Success", "Users" : data});
		},
		function(err)
		{
			self.res.json({"Success" : 0, "Message" : err.message, "Error" : err});
		});
};

userController.prototype.create = function() {
	var self = this;

	var user = new userModel();
//	self.req.body.user_password = md5(self.req.body.user_password);
	user.data.user_email	= self.req.body.user_email;
	user.data.user_password	= md5(self.req.body.user_password);
	user.create(//self.req.body,
		function(data)
		{
			self.res.json({"Success" : 1, "Message" : "User Added !"});
		},
		function(err)
		{
			self.res.json({"Success" : 0, "Message" : err.message, "Error" : err});
		});
};

userController.prototype.update = function() {
	var self = this;

	var user = new userModel();
	self.req.body.user_password = md5(self.req.body.user_password);
	user.update(self.req.body,
		function(data)
		{
			self.res.json({"Success" : 1, "Message" : "Updated the password for email " + self.req.body.user_email});
		},
		function(err)
		{
			self.res.json({"Success" : 0, "Message" : err.message, "Error" : err});
		});
};

userController.prototype.remove = function() {
	var self = this;

	var user = new userModel();
	user.remove(self.req.params.user_id,
		function(data)
		{
			self.res.json({"Success" : 1, "Message" : "Deleted the user with email " + self.req.params.user_id});
		},
		function(err)
		{
			self.res.json({"Success" : 0, "Message" : err.message, "Error" : err});
		});
};

module.exports = userController;
