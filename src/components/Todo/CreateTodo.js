import React, {Component} from 'react';
import TodosList from './TodosList';

export default class CreateTodo extends Component {

	state = {
		todoDescription: '',
		todoResponsible: '',
		todoPriority: '',
		todoCompleted: false,
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	onSubmit = (e) => {
		e.preventDefault();

		const newTodo = {
			todoDescription: this.state.todoDescription,
			todoResponsible: this.state.todoResponsible,
			todoPriority: this.state.todoPriority,
			todoCompleted: false,
			updatedAt: new Date(),
			createdAt: new Date()
		}

		this.props.addTodo(newTodo);
	}

	render() {
		return (
			<div>
				<div className='d-block mx-auto'>
					<div className="row">
						<div className="col-md-6">
							<h3>Create new Todo</h3>
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor="desc">Description</label>
									<input onChange={this.handleChange} className='form-control' name='todoDescription'
									       type="text" id='desc' value={this.state.todoDescription}/>
								</div>

								<div className="form-group">
									<label htmlFor="resp">Responsible</label>
									<input onChange={this.handleChange} className='form-control' name='todoResponsible'
									       type="text" id='resp' value={this.state.todoResponsible}/>
								</div>

								<div className="form-group">
									<div className="form-check form-check-inline">
										<input type="radio" className="form-check-input"
										       name='todoPriority'
										       id='priorityLow'
										       value='low'
										       checked={this.state.todoPriority === 'low'}
										       onChange={this.handleChange}
										/>
										<label htmlFor="priorityLow" className='form-check-label'>Low priority</label>
									</div>

									<div className="form-check form-check-inline">
										<input type="radio" className="form-check-input"
										       name='todoPriority'
										       id='priorityMedium'
										       value='medium'
										       checked={this.state.todoPriority === 'medium'}
										       onChange={this.handleChange}
										/>
										<label htmlFor="priorityMedium" className='form-check-label'>Medium priority</label>
									</div>

									<div className="form-check form-check-inline">
										<input type="radio" className="form-check-input"
										       name='todoPriority'
										       id='priorityHigh'
										       value='high'
										       checked={this.state.todoPriority === 'high'}
										       onChange={this.handleChange}
										/>
										<label htmlFor="priorityHigh" className='form-check-label'>High priority</label>
									</div>
								</div>

								<div className="form-group">
									<button type='submit' className='btn btn-primary'>Submit</button>
								</div>
							</form>
						</div>
						<div className="col-md-6">
							<TodosList
								deleteTodo={this.props.deleteTodo}
								makeMarked={this.props.makeMarked}
								todos={this.props.todos} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}