import React, {Component} from 'react';
import axios from 'axios';
import TodoItem from './TodoItem'

export default class TodosList extends Component {

	state = {
		todos: []
	}

	componentDidMount() {
		this.getTodos();
	}

	getTodos = async () => {
		let res = await axios.get('http://192.168.1.11:4000/todos');
		let data = res.data;
		this.setState({
			todos: data
		});
	}

	render() {
		return (
			<div className="content">
				<h2>Welcome to this todo-app!</h2>
				<p>This is the list of apps in total</p>

				{this.state.todos.length === 0 ? <div>Loading...</div> :
					<table className='table table-striped'>
						<thead>
						<tr>
							<th>Description</th>
							<th>Assigned to</th>
							<th>Priority</th>
							<th>Action</th>
						</tr>
						</thead>
						<tbody>
						{
							this.state.todos.map((e, i) => {
								return <TodoItem key={i} todo={e}/>
							})
						}
						</tbody>
					</table>
				}
			</div>
		)
	}
}