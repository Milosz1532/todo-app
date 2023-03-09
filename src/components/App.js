import React, { useState } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import AddTask from './AddTask'
import TodoList from './TodoList'

const storedTheme =
	localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme)

function App() {
	const [taskList, setTaskList] = useState([
		// { id: 0, text: 'Hello World!', date: formatDate(Date.now()), isActive: true, isCompleted: false, isEdited: false },
		// { id: 1, text: 'Hello World!', date: formatDate(Date.now()), isActive: true, isCompleted: false, isEdited: false },
		// { id: 2, text: 'Hello World!', date: formatDate(Date.now()), isActive: true, isCompleted: false, isEdited: false },
	])

	const toggleClassName = storedTheme === 'dark' ? 'toggle-item active' : 'toggle-item'

	const addNewTask = text => {
		setTaskList(oldArray => [
			{
				id: oldArray.length + 1,
				text: text,
				date: Date.now(),
				isActive: true,
				isCompleted: false,
				isEdited: false,
			},
			...oldArray,
		])
	}

	const deleteTask = (id, task) => {
		task.classList.add('remove') // For animation
		setTimeout(() => {
			const newArray = taskList.map(obj => {
				if (obj.id === id) {
					return { ...obj, isActive: false }
				}

				return obj
			})
			setTaskList(newArray)
		}, 600)
	}

	const editTask = (id, task, value = null) => {
		const otherItems = document.querySelector('.listBox')
		if (value === null) {
			if (taskList.find(el => el.isEdited)) {
				return
			}
			task.classList.add('editTaskMode')
			otherItems.classList.add('blurEffect')
			document.querySelector('.inputDesign').style.pointerEvents = 'none'
			const newArray = taskList.map(obj => {
				if (obj.id === id) {
					return { ...obj, isEdited: true }
				}

				return obj
			})
			setTaskList(newArray)
		} else {
			const newArray = taskList.map(obj => {
				if (obj.id === id) {
					return { ...obj, text: value, isEdited: false }
				}

				return obj
			})
			setTaskList(newArray)
			task.classList.remove('editTaskMode')
			otherItems.classList.remove('blurEffect')
			document.querySelector('.inputDesign').style.pointerEvents = 'auto'
		}
	}

	const completeTask = id => {
		const newArray = taskList.map(obj => {
			if (obj.id === id) {
				return { ...obj, isCompleted: true }
			}

			return obj
		})
		setTaskList(newArray)
	}

	const handleToggleMode = e => {
		e.target.classList.toggle('active')
		const currentTheme = document.documentElement.getAttribute('data-theme')
		let targetTheme = 'light'
		if (currentTheme === 'light') {
			targetTheme = 'dark'
		}
		document.documentElement.setAttribute('data-theme', targetTheme)
		localStorage.setItem('theme', targetTheme)
	}

	return (
		<div className='App'>
			<div className='title m-auto text-center pt-5'>
				<h3 style={{ fontWeight: '300' }}>TODO APP</h3>
				<div className='toggle'>
					<span
						onClick={handleToggleMode}
						className={toggleClassName}></span>
				</div>
			</div>
			<div className='Container'>
				<AddTask addNewTask={addNewTask} />
				<TodoList taskList={taskList} completeTask={completeTask} editTask={editTask} deleteTask={deleteTask} />
			</div>
			<footer>
				<span>
					Author : <b>Miłosz Konopka</b>
				</span>
			</footer>
		</div>
	)
}

export default App
