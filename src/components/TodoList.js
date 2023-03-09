import React, { useState } from 'react'

import Task from './Task'

import './TodoList.css'

const TodoList = ({ taskList, completeTask, editTask, deleteTask }) => {
	const [sortType, setSortType] = useState('all')

	const showTaskList = () => {
		let tasks = taskList
		if (sortType === 'all') {
			tasks = taskList.filter(task => task.isActive === true)
		} else if (sortType === 'notCompleted') {
			tasks = taskList.filter(task => task.isCompleted === false && task.isActive === true)
		} else if (sortType === 'deleted') {
			tasks = taskList.filter(task => task.isActive === false)
		}

		tasks = tasks.map(task => (
			<Task
				key={task.id}
				id={task.id}
				text={task.text}
				date={task.date}
				completeTask={completeTask}
				editTask={editTask}
				deleteTask={deleteTask}
				isCompleted={task.isCompleted}
				isEdited={task.isEdited}
				isActive={task.isActive}
			/>
		))
		return tasks
	}

	const handleSort = (e, type) => {
		if (e.target.classList.contains('active')) return
		document.querySelectorAll('#sortButtons > button').forEach(element => {
			element.classList.remove('active')
		})
		setSortType(type)
		e.target.classList.add('active')
	}

	return (
		<div className='row pt-3'>
			<div className='listBox col-md-8 m-auto'>
				<div id='title'>
					<h5>Todo List</h5>
					<div id='sortButtons'>
						<button onClick={e => handleSort(e, 'all')} className='active'>
							All
						</button>
						<button onClick={e => handleSort(e, 'notCompleted')}>Active</button>
						<button onClick={e => handleSort(e, 'deleted')}>Deleted</button>
					</div>
				</div>
				{showTaskList().length === 0 ? <p className='text-center mt-3'>There are no task yet 🤨</p> : showTaskList()}
			</div>
		</div>
	)
}

export default TodoList
