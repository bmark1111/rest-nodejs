var schemas	= require("../node_modules/schemas.js");
var _		= require("lodash");

var userModel = function () {
	db.table = 'user';
	this.primary = Object.keys(schemas.userModel)[0];
};

userModel.prototype.data = {};

userModel.prototype.list = function (callback, errCallback) {
	db.select();
	db.where('is_deleted', 0);
	db.query(
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
	db.where(this.primary, id);
	db.where('is_deleted', 0);
	db.query(
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

userModel.prototype.create = function (callback, errCallback) {
	this.data.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
	this.data = this.sanitize(this.data);
	this.data = this.scrub(this.data);
	db.insert(this.data);
	db.query(
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

userModel.prototype.update = function (id, callback, errCallback) {
	this.data = this.sanitize(this.data);
	this.data = this.scrub(this.data);
	db.update(this.data);
	db.where(this.primary, id);
	db.query(
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
	db.remove();
	db.where(this.primary, id);
	db.query(
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
//userModel.prototype.changeName = function (name) {
//	this.data.name = name;
//};
//
//userModel.prototype.set = function (name, value) {
//	this.data[name] = value;
//}
//
//userModel.prototype.save = function (callback) {
//	var self = this;
//	this.data = this.sanitize(this.data);
//	db.get('users', {id: this.data.id}).update(JSON.stringify(this.data)).run(function (err, result) {
//		if (err) return callback(err);
//		callback(null, result); 
//	});
//}
//
//userModel.findById = function (id, callback) {
//	db.get('users', {id: id}).run(function (err, data) {
//		if (err) return callback(err);
//		callback(null, new userModel(data));
//	});
//}

module.exports = userModel;
