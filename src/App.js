import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import TodosList from './components/Todo/TodosList';
import CreateTodo from './components/Todo/CreateTodo';
import EditTodo from './components/Todo/EditTodo';
import logo from './logo.svg';

export default class App extends Component {

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
						<Route path='/' exact component={TodosList} />
						<Route path='/edit/:id' component={EditTodo} />
						<Route path='/create' component={CreateTodo} />
					</div>
				</div>
			</Router>
		);
	}
}
