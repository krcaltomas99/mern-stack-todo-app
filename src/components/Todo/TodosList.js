import React, {Component} from 'react';
import TodoItem from './TodoItem'

export default class TodosList extends Component {

	render() {
		return (
			<div className="content">
				<h2>Welcome to this todo-app!</h2>
				<p>This is the list of apps in total</p>

				{this.props.todos.length === 0 ? <div>Loading...</div> :
					<table className='table table-striped'>
						<thead>
						<tr>
							<th>Done</th>
							<th>Description</th>
							<th>Assigned to</th>
							<th>Priority</th>
							<th></th>
							<th></th>
						</tr>
						</thead>
						<tbody>
						{
							this.props.todos.map((e, i) => {
								return <TodoItem
									deleteTodo={this.props.deleteTodo}
									makeMarked={this.props.makeMarked}
									key={i}
									todo={e}/>
							})
						}
						</tbody>
					</table>
				}
			</div>
		)
	}
}