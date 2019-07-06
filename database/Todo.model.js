const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
	todoDescription: {
		type: String,
	},
	todoResponsible: {
		type: String
	},
	todoPriority: {
		type: String
	},
	todoCompleted: {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date
	}
});

module.exports = mongoose.model('Todo', Todo);