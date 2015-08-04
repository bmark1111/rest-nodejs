var schemas	= require("../node_modules/schemas.js");
var _		= require("lodash");

var userModel = function () {
//console.log('user model')
//	this.data = this.sanitize(data);
//	this.connection = connection;
};

userModel.prototype.connection = false;
userModel.prototype.data = {};

userModel.prototype.list = function (callback) {
//console.log('user model list');
	this.data = db.get(false,
		function(data)
		{
//console.log(data);
//console.log('xxxxxxxxxxxxxx');
			this.data = data;
			callback(data);
		});
}

userModel.prototype.retrieve = function (id, callback) {
//console.log('user model retrieve');
	this.data = db.get(id,
		function(data)
		{
			this.data = data;
			callback(data);
		});
};

userModel.prototype.create = function (body, callback) {
console.log('user model create');
	this.data = db.create(body,
		function(data)
		{
			this.data = data;
			callback(data);
		});
};

userModel.prototype.update = function (body, callback) {
console.log('user model update');
	this.data = db.update(body,
		function(data)
		{
			this.data = data;
			callback(data);
		});
};

///////////////////////////////////////////////////////////////////////////////
userModel.prototype.changeName = function (name) {
	this.data.name = name;
};

userModel.prototype.set = function (name, value) {
	this.data[name] = value;
}

userModel.prototype.sanitize = function (data) {
	data = data || {};
	schema = schemas.userModel;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
}

userModel.prototype.save = function (callback) {
	var self = this;
	this.data = this.sanitize(this.data);
	db.get('users', {id: this.data.id}).update(JSON.stringify(this.data)).run(function (err, result) {
		if (err) return callback(err);
		callback(null, result); 
	});
}

userModel.findById = function (id, callback) {
	db.get('users', {id: id}).run(function (err, data) {
		if (err) return callback(err);
		callback(null, new userModel(data));
	});
}

module.exports = userModel;
