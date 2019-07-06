import React from 'react';
import {Link} from 'react-router-dom';

export default class TodoItem extends React.Component {
	render() {
		let {_id, todoDescription, todoResponsible, todoPriority, todoCompleted} = this.props.todo;
		
		return (
			<p className={'d-flex justify-content-between align-items-center ' + (todoCompleted ? 'completed' : '')}>
				<input type="checkbox"
				       checked={todoCompleted && true}
				       onChange={this.props.makeMarked.bind(this, _id, todoCompleted)}
				       value={todoCompleted}
				/>
				{' '}
				<span>{todoDescription}</span>
				<span>{todoResponsible}</span>
				<span>{todoPriority}</span>
				<span>
					<Link className='btn btn-outline-primary' to={'/edit/' + _id}>Edit</Link>
				</span>
				<span>
					<button className='btn btn-danger'
						onClick={this.props.deleteTodo.bind(this, _id)}
					>Delete</button>
				</span>
			</p>
		)
	}

}