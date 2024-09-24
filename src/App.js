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

	const handleDragStart = (e, ticket, from) => {
		e.dataTransfer.setData('text/plain', JSON.stringify({ ticket, from }));
	};

	const handleDrop = (e, to) => {
		e.preventDefault();
		const { ticket, from } = JSON.parse(e.dataTransfer.getData('text/plain'));
		if (from !== to) moveTicket(ticket, from, to);
	};

	const allowDrop = (e) => {
		e.preventDefault();
	};

	const moveTicket = (ticket, from, to) => {
		if (to === 'todo') {
			if (from === 'inProgress') setInProgress(inProgressTickets.filter(t => t !== ticket));
			if (from === 'done') setDone(doneTickets.filter(t => t !== ticket));
			setTodos([...todoTickets, ticket]);
		} else if (to === 'inProgress') {
			if (from === 'todo') setTodos(todoTickets.filter(t => t !== ticket));
			if (from === 'done') setDone(doneTickets.filter(t => t !== ticket));
			setInProgress([...inProgressTickets, ticket]);
		} else if (to === 'done') {
			if (from === 'todo') setTodos(todoTickets.filter(t => t !== ticket));
			if (from === 'inProgress') setInProgress(inProgressTickets.filter(t => t !== ticket));
			setDone([...doneTickets, ticket]);
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
					<div className='status p-3 ' onDrop={(e) => handleDrop(e, 'todo')} onDragOver={allowDrop}>
						 <h4 className='text-start border-bottom border-3 border-dark mb-4'>To Do</h4>
						{todoTickets.map((todoTicket)=>(
							<div draggable="true" className='tickets' onDragStart={(e) => handleDragStart(e, todoTicket, 'todo')}>{todoTicket}</div>
						))}
					</div>
				</div>
				<div className='col-lg-4' >
					<div className='status p-3' onDrop={(e) => handleDrop(e, 'inProgress')} onDragOver={allowDrop}>
						<h4 className='text-start border-bottom border-3 border-dark mb-4'>In Progress</h4>
						{inProgressTickets.map((inProgressTicket)=>(
							<div draggable="true" className='tickets' onDragStart={(e) => handleDragStart(e, inProgressTicket, 'inProgress')}>{inProgressTicket}</div>
						))}
					</div>
				</div>
				<div className='col-lg-4 ' >
					<div className='status p-3' onDrop={(e) => handleDrop(e, 'done')} onDragOver={allowDrop}>
						<h4 className='text-start border-bottom border-3 border-dark mb-4'>Done</h4>
						{doneTickets.map((doneTicket)=>(
							<div draggable="true" className='tickets' onDragStart={(e) => handleDragStart(e, doneTicket, 'done')}>{doneTicket}</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
