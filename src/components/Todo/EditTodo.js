import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {
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

	handleChangeTodoCompleted = () => {
		this.setState({
			todoCompleted: !this.state.todoCompleted
		})
	}

	onSubmit = (e) => {
		e.preventDefault();
		let todo = {
			todoDescription: this.state.todoDescription,
			todoResponsible: this.state.todoResponsible,
			todoPriority: this.state.todoPriority,
			todoCompleted: this.state.todoCompleted
		}

		axios.put('http://192.168.1.11:4000/todos/update/' + this.props.match.params.id, todo)
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});

		this.props.history.push('/');
	}

	getTodo = async () => {
		let res = await axios.get('http://192.168.1.11:4000/todos/' + this.props.match.params.id);
		let data = res.data;
		this.setState({
			todoDescription: data.todoDescription,
			todoResponsible: data.todoResponsible,
			todoPriority: data.todoPriority,
			todoCompleted: data.todoCompleted
		});
	}

	componentDidMount() {
		this.getTodo()
	}

	render() {
		return (
			<div>
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

					<div className="form-check">
						<input type="checkbox"
						       className='form-check-input'
						       id='todoCompleted'
						       name='todoCompleted'
						       onChange={this.handleChangeTodoCompleted}
						       checked={this.state.todoCompleted}
						       value={this.state.todoCompleted}
						/>

						<label htmlFor="todoCompleted" className='form-check-label'>Completed</label>
					</div>

					<div className="form-group">
						<button type='submit' className='btn btn-primary'>Submit</button>
					</div>
				</form>
			</div>
		)
	}
}