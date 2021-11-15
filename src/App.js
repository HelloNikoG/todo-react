import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Form';
import TodoList from './TodoList';

const App = () => {
	const [inputText, setInputText] = useState('');
	const [todos, setTodos] = useState([]);
	const [status, setStatus] = useState('all');
	const [filteredTodos, setFilteredTodos] = useState([]);

	//run once when the app starts

	useEffect(() => {
		getLocalTodos();
	}, []);
	useEffect(() => {
		filterHandler();
		saveLocalTodos();
	}, [todos, status]);

	const filterHandler = () => {
		switch (status) {
			case 'completed':
				setFilteredTodos(todos.filter((todo) => todo.completed === true));
				break;
			case 'uncompleted':
				setFilteredTodos(todos.filter((todo) => todo.completed !== true));
				break;
			default:
				setFilteredTodos(todos);
				break;
		}
	};

	//save local storage

	const saveLocalTodos = () => {
		localStorage.setItem('todos', JSON.stringify(todos));
	};
	const getLocalTodos = () => {
		if (localStorage.getItem('todos') === null) {
			localStorage.setItem('todos', JSON.stringify([]));
		} else {
			let todoLocal = JSON.parse(localStorage.getItem('todos'));
			setTodos(todoLocal);
		}
	};
	return (
		<div className="App">
			<header>
				<h1>.To-do</h1>
			</header>
			<Form
				inputText={inputText}
				setInputText={setInputText}
				todos={todos}
				setTodos={setTodos}
				setStatus={setStatus}
			/>
			<TodoList
				todos={todos}
				TodoList={TodoList}
				setTodos={setTodos}
				filteredTodos={filteredTodos}
			/>
		</div>
	);
};
// export class App extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			newItem: '',
// 			list: [],
// 		};
// 	}

// 	//if working wih local storage
// 	updateInput = (key, value) => {
// 		//update react state
// 		this.setState({
// 			[key]: value,
// 		});
// 	};

// 	addItem = () => {
// 		//create item with unique id
// 		const addedItem = {
// 			id: 1 + Math.random(),
// 			value: this.state.newItem.slice(),
// 		};

// 		//copy of current list items
// 		const list = [...this.state.list];

// 		//add new item to list
// 		list.push(addedItem);

// 		//update state with new list item and reset input
// 		this.setState({
// 			list,
// 			newItem: '',
// 		});
// 	};

// 	deleteItem = (id) => {
// 		//copy current list of items
// 		const list = [...this.state.list];

// 		//filter out item being deleted
// 		const updatedList = list.filter((item) => item.id !== id);

// 		this.setState({ list: updatedList });
// 	};

// 	render() {
// 		return (
// 			<div className="App">
// 				<div>
// 					Add item...
// 					<br />
// 					<input
// 						type="text"
// 						placeholder="type item here"
// 						value={this.state.newItem}
// 						onChange={(e) => this.updateInput('newItem', e.target.value)}
// 					/>
// 					<button onClick={this.addItem}>add</button>
// 					<br />
// 					<ul>
// 						{this.state.list.map((item) => {
// 							return (
// 								<li key={item.id}>
// 									{item.value}
// 									<button onClick={() => this.deleteItem(item.id)}>x</button>
// 								</li>
// 							);
// 						})}
// 					</ul>
// 					{/* <ul>
//             {this.state.list.map(item => {
//               return (
//                 <li key={item.id}>
//                   {item.value}
//                   <button className="btn btn-floating" onClick={() => this.deleteItem(item.id)}>
//                     <i class="material-icons">x</i>
//                   </button>
//                 </li>
//               );
//             })}
//           </ul> */}
// 				</div>
// 			</div>
// 		);
// 	}
// }

export default App;
