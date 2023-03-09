import React, { useState } from 'react'
import './AddTask.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faIndent } from '@fortawesome/free-solid-svg-icons'

const AddTask = ({ addNewTask }) => {
	const [text, setText] = useState('')

	const addTask = () => {
		if (text.length === 0) return
		addNewTask(text)
		setText('')
	}

	const handleSubmit = e => {
		if (e.key === 'Enter') {
			addTask()
		}
	}

	return (
		<div className='row pt-3'>
			<div className='col-md-8 m-auto'>
				<div className='inputDesign'>
					<span>
						<FontAwesomeIcon icon={faIndent} />
					</span>
					<input
						value={text}
						onKeyDown={handleSubmit}
						onChange={event => setText(event.target.value)}
						placeholder='Create a new todo...'
					/>
					<button onClick={addTask}>
						<FontAwesomeIcon icon={faCirclePlus} /> Add task
					</button>
				</div>
			</div>
		</div>
	)
}

export default AddTask
