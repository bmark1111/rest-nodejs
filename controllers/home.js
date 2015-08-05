function homeController(req, res) {
	var self = this;
	self.init(req, res);
};

homeController.prototype.init = function(req, res) {
	var self = this;

	res.json({"Message" : "home controller"});
};

module.exports = homeController;
