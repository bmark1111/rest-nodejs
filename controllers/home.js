//var Video = require('../models/user');

//module.exports.controller = function(req, res) {
////	console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
//	res.json({"Message" : "home controller xxxx"});
//	return;
//};

function homeController(req, res) {//, connection) {
	var self = this;
	self.init(req, res);//, connection);
};

homeController.prototype.init = function(req, res) {//, connection) {
	var self = this;

	res.json({"Message" : "home controller"});
};

module.exports = homeController;
