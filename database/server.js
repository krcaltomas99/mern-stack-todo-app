const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const mongoose = require('mongoose');
const app = express();

const todoRoutes = express.Router();
let Todo = require('./Todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
	console.log('MongoDB databse connection established.');
});

todoRoutes.route('/').get(function (req, res) {
	Todo.find(function (err, todos) {
		if (err) {
			console.log('Error: ' + err);
		} else {
			console.log(res.json(todos))
		}
	})
});

todoRoutes.route('/:id').get(function (req, res) {
	let id = req.params.id;
	Todo.findById(id, function (err, todo) {
		console.log(res.json(todo));
	})
});

todoRoutes.route('/add').post(function (req, res) {
	let todo = new Todo(req.body);
	todo.save()
		.then(() => {
			res.status(200).json('todo added')
		})
		.catch(() => {
			res.status(400).send('Adding failed')
		})
});

todoRoutes.route('/update/:id').put(function (req, res) {
	Todo.findById(req.params.id, function (err, todo) {
		if (!todo) {
			res.status(400).send('failed');

		} else {
			todo.todoDescription = req.body.todoDescription;
			todo.todoResponsible = req.body.todoResponsible;
			todo.todoPriority = req.body.todoPriority;
			todo.todoCompleted = req.body.todoCompleted;
			todo.save()
				.then(todo => {
					res.status(200).json('Todo updated');
				})
				.catch(err => {
					res.status(400).send('Update failed');
				})
		}

	});
});

todoRoutes.route('/delete/:id').delete(function (req, res) {
	Todo.findById(req.params.id, function (err, todo) {
		if (!todo) {
			res.status(404).send('Not found');
		} else {
			todo.delete()
				.then(todo => {
					res.status(200).json('Todo updated');
				})
				.catch(err => {
					res.status(400).send('Update failed');
				})
		}
	})
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => console.log('Backend server is running on port: ' + PORT));