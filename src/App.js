import React, { useState } from 'react';
import './App.css';

function App() {
	const [todoTickets, setTodos] = useState([]);
	const [inProgressTickets, setInProgress] = useState([]);
	const [doneTickets, setDone] = useState([]);

  	const [input, setInput] = useState('');

	let handleInputChange = (e)=>{
		setInput(e.target.value);
	}

	const handleAddTodo = () => {
		if (input.trim() !== '') {
		  setTodos([...todoTickets, input]);
		  setInput('');
		}
	  };

	return (
		<div className='px-5'>
			<h1>Create Task</h1>
			<div style={{marginTop: '0px'}}>
				<input type="text" value={input} onChange={handleInputChange} placeholder="Add a new task" />
				<button onClick={handleAddTodo} className='btn btn-primary' >Add</button>
			</div>
			<div className='row'>
				<div className='col-lg-4 ' >
					<div className='status p-3 '>
						<h4 className='text-start border-bottom border-3 border-dark mb-4'>To Do</h4>
						{todoTickets.map((todoTicket)=>(
							<div className='tickets'>{todoTicket}</div>
						))}
					</div>
				</div>
				<div className='col-lg-4' >
					<div className='status p-3'>
						<h4 className='text-start border-bottom border-3 border-dark mb-4'>In Progress</h4>
						{inProgressTickets.map((inProgressTicket)=>(
							<div className='tickets'>{inProgressTicket}</div>
						))}
					</div>
				</div>
				<div className='col-lg-4 ' >
					<div className='status p-3'>
						<h4 className='text-start border-bottom border-3 border-dark mb-4'>Done</h4>
						{doneTickets.map((doneTicket)=>(
							<div className='tickets'>{doneTicket}</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
