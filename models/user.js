var schemas	= require("../node_modules/schemas.js");
var _		= require("lodash");

var userModel = function () {
//console.log('user model')
//	this.data = this.sanitize(data);
//	this.connection = connection;
	db.table = 'user_login';
};

userModel.prototype.connection = false;
userModel.prototype.data = {};

userModel.prototype.list = function (callback, errCallback) {
	db.select();
	this.data = db.get(false,
		function(data)
		{
			this.data = data;
			callback(data);
		},
		function(err)
		{
			errCallback(err);
		});
};

userModel.prototype.retrieve = function (id, callback, errCallback) {
	db.select();
	db.where({'user_id': id});
	this.data = db.get(//id,
		function(data)
		{
			this.data = data;
			callback(data);
		},
		function(err)
		{
			errCallback(err);
		});
};

//userModel.prototype.create = function (body, callback, errCallback) {
userModel.prototype.create = function (callback, errCallback) {
	this.data.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	this.data = this.sanitize(this.data);
	this.data = this.scrub(this.data);
	db.insert(this.data);
	this.data = db.create(//this.data,
		function(data)
		{
			this.data = data;
			callback(data);
		},
		function(err)
		{
			errCallback(err);
		});
};

userModel.prototype.update = function (body, callback, errCallback) {
	body = this.sanitize(body);
	this.data = db.update(body,
		function(data)
		{
			this.data = data;
			callback(data);
		},
		function(err)
		{
			errCallback(err);
		});
};

userModel.prototype.remove = function (id, callback, errCallback) {
	this.data = db.remove(id,
		function(data)
		{
			this.data = data;
			callback(data);
		},
		function(err)
		{
			errCallback(err);
		});
};

userModel.prototype.sanitize = function (data) {
	data = data || {};
	schema = schemas.userModel;
	return _.pick(_.defaults(data, schema), _.keys(schema)); 
};

userModel.prototype.scrub = function (data) {
	var ret = {};
	for (var i in data)
	{
		if (data[i])
		{
			ret[i] = data[i];
		}
	}
	return ret;
};

///////////////////////////////////////////////////////////////////////////////
userModel.prototype.changeName = function (name) {
	this.data.name = name;
};

userModel.prototype.set = function (name, value) {
	this.data[name] = value;
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
