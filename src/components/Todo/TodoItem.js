import React from 'react';
import {Link} from 'react-router-dom';

export default class TodoItem extends React.Component {
	render() {
		let {_id, todoDescription, todoResponsible, todoPriority, todoCompleted} = this.props.todo;

		return (
			<tr>
				<td>
					<form action="">
						<input type="checkbox"
						       checked={todoCompleted && true}
						       onChange={this.props.makeMarked.bind(this, _id, todoCompleted)}
						       value={todoCompleted}
						/>
					</form>
				</td>
				<td className={(todoCompleted ? 'completed' : '')}>{todoDescription}</td>
				<td className={(todoCompleted ? 'completed' : '')}>{todoResponsible}</td>
				<td className={(todoCompleted ? 'completed' : '')}>{todoPriority}</td>
				<td>
					<Link className='btn btn-outline-primary' to={'/edit/' + _id}>Edit</Link>
				</td>
				<td>
					<button className='btn btn-danger'
					        onClick={this.props.deleteTodo.bind(this, _id)}
					>Delete
					</button>
				</td>
			</tr>
		)
	}

}