import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TodosList from './components/Todo/TodosList';
import CreateTodo from './components/Todo/CreateTodo';
import EditTodo from './components/Todo/EditTodo';
import logo from './logo.svg';
import axios from "axios";

export default class App extends Component {

	state = {
		todos: []
	}

	componentDidMount() {
		this.getTodos()
	}

	getTodos = async () => {
		let res = await axios.get('http://localhost:4000/todos');
		let todos = res.data.reverse();

		this.setState({
			todos
		});
	}

	addTodo = async (todo) => {
		const newTodo = {
			todoDescription: todo.todoDescription,
			todoResponsible: todo.todoResponsible,
			todoPriority: todo.todoPriority,
			todoCompleted: false,
			createdAt: todo.createdAt,
			updatedAt: todo.updatedAt
		}

		axios.post('http://localhost:4000/todos/add', newTodo)
			.then(res => {
				this.setState({
					todos: [res.data.todo, ...this.state.todos]
				});
			})
			.catch(err => console.log(err));
	}

	updateTodo = async (todo) => {
		axios.put('http://localhost:4000/todos/update/' + todo._id, todo)
			.then(res => {
				console.log(todo);
				this.setState({
					todos: this.state.todos.map(todoItem => {
						if (todoItem._id === todo._id) {
							todoItem.todoResponsible = todo.todoResponsible;
							todoItem.todoDescription = todo.todoDescription;
							todoItem.todoPriority = todo.todoPriority;
						}

						return todoItem;
					})
				});
			})
			.catch(err => {
				console.log(err);
			});
	}

	deleteTodo = async (id) => {
		axios.delete('http://localhost:4000/todos/delete/' + id)
			.then((res) => {
				this.setState({
					todos: [...this.state.todos.filter(todo => todo._id !== id)]
				})
			})
			.catch(err => console.log(err));
	}

	makeMarked = async (id, todoCompleted) => {
		const updateTodo = {
			todoCompleted: !todoCompleted,
		}
		axios.put('http://localhost:4000/todos/chngcmplt/' + id, updateTodo)
			.then((res) => {
				console.log(res);
				this.setState({
					todos: this.state.todos.map(todo => {
						if (todo._id === id) {
							todo.todoCompleted = !todoCompleted
						}
						return todo;
					})
				})
			})
			.catch(err => console.log(err));

	}

	render() {
		return (
			<Router>
				<nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-con">
					<Link className="navbar-brand" to='/'>
						<img src={logo} alt="logo" height='30' width='30'/>
						<span>MERN-Stack Todo App</span>
					</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse"
					        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
					        aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div style={{flexGrow: '0'}} className="collapse navbar-collapse ml-auto" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<Link className='nav-item nav-link' to='/'>List todos</Link>
							<Link className='nav-item nav-link' to='/create'>Create todo</Link>
						</div>
					</div>
				</nav>

				<div className="container">
					<div className="content my-5">
						<Route path='/' exact render={(props) =>
							<TodosList
								{...props}
								todos={this.state.todos}
								deleteTodo={this.deleteTodo}
								makeMarked={this.makeMarked}
							/>
						}/>
						<Route path='/edit/:id' render={
							(props) => <EditTodo {...props} updateTodo={this.updateTodo}/>
						}/>
						<Route path='/create'
						       component={(props) => <CreateTodo
							       {...props}
							       deleteTodo={this.deleteTodo}
							       makeMarked={this.makeMarked}
							       addTodo={this.addTodo}
							       todos={this.state.todos}
						       />}
						/>
					</div>
				</div>
			</Router>
		);
	}
}
