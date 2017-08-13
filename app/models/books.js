'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Books = new Schema({
	name: String,
  owner: {
		city: String,
		fullname: String,
		state: String,
		id: String
	},
	pending: {}
});

module.exports = mongoose.model('Books', Books);
