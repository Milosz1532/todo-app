import React, { useState } from 'react'

import { faDotCircle, faTrashCan, faPenFancy, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Task.css'

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear(),
		hour = d.getHours(),
		minutes = d.getMinutes(),
		secounds = d.getSeconds()

	if (month.length < 2) month = '0' + month
	if (day.length < 2) day = '0' + day
	if (hour < 9) hour = '0' + hour
	if (minutes < 9) minutes = '0' + minutes
	if (secounds < 9) secounds = '0' + secounds

	return [day, month, year].join('/') + ' ' + [hour, minutes, secounds].join(':')
}

const Buttons = ({ id, completeTask, editTask, deleteTask, isCompleted, isEdited, inputValue, isActive }) => {
	if (isEdited) {
		return (
			<div className='taskItem-options'>
				<button onClick={e => editTask(id, e.target.parentElement.parentElement, inputValue)} className='checkButton'>
					<FontAwesomeIcon icon={faCheck} />
				</button>
			</div>
		)
	} else {
		return (
			<div className='taskItem-options'>
				{isCompleted === false && isActive === true ? (
					<>
						<button onClick={e => completeTask(id)} className='checkButton'>
							<FontAwesomeIcon icon={faCheck} />
						</button>
						<button className='editButton' onClick={e => editTask(id, e.target.parentElement.parentElement)}>
							<FontAwesomeIcon icon={faPenFancy} />
						</button>
					</>
				) : (
					false
				)}
				{isActive === true ? (
					<button onClick={e => deleteTask(id, e.target.parentElement.parentElement)} className='deleteButton'>
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				) : (
					false
				)}
			</div>
		)
	}
}

const Task = ({ id, text, date, completeTask, editTask, deleteTask, isCompleted, isEdited, isActive }) => {
	let spanText = <span>{text}</span>
	if (isCompleted === true) {
		spanText = <span className='isCompleted'>{text}</span>
	}
	if (isActive === false) {
		spanText = <del>{text}</del>
	}

	const [inputValue, setInputValue] = useState(text)

	const handleChangeInput = e => {
		if (e.target.value.length < 59) {
			setInputValue(e.target.value)
		}
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			editTask(id, e.target.parentElement.parentElement, inputValue)
		}
	}

	return (
		<>
			<div className='taskItem'>
				<div className='taskItem-content'>
					<span className='taskItem-icon'>
						<FontAwesomeIcon icon={faDotCircle} />
					</span>
					{isEdited ? (
						<input
							autoFocus
							className='taskInput'
							onKeyDown={handleKeyDown}
							onChange={handleChangeInput}
							value={inputValue}
						/>
					) : (
						<>
						<span>{spanText}</span>
						<p className='taskItem-date'>{`Date: ${formatDate(date)}`}</p>
						</>
						
					)}
				</div>
				<Buttons
					id={id}
					completeTask={completeTask}
					editTask={editTask}
					deleteTask={deleteTask}
					isCompleted={isCompleted}
					isEdited={isEdited}
					isActive={isActive}
					inputValue={inputValue}
				/>
			</div>
		</>
	)
}

export default Task
