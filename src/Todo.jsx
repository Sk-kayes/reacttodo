import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
export default function Todo() {
    let [todo, setTodo] = useState([{task: "Sample Task", id: uuidv4(), isDone: false}]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = ()=> {
        setTodo((prevTodo)=> {
            return [...todo, {task: newTodo, id: uuidv4(), isDone: false}];
        });
        setNewTodo("");
    }

    function updateTodoValue(event) {
        setNewTodo(event.target.value);
        
    }

    function deleteTodo(id) {
        setTodo(todo.filter((task)=> task.id != id));
    }

    function setUpperCase() {
        setTodo(
            todo.map((task)=> {
                return {
                    ...todo, task:task.task.toUpperCase()
                }
            })
        )
    }

    function markAsDone(id) {
        setTodo(
            todo.map((task)=> {
                if(task.id == id) {
                    return {
                        ...task, isDone: true
                    }
                } else {
                    return task
                }
            })
        )
    }
    return (
        <>
            <h1>Add Your Tasks</h1>
            <input placeholder="Enter Task" value={newTodo} onChange={updateTodoValue}/>
            <button onClick={addNewTask}>Add</button>

            <h4>Task Have to Complete</h4>
            <ul>
                {
                    todo.map((task)=> (
                        <li key={task.id}>
                            <span style={task.isDone ? {textDecorationLine: "line-through"}:{}}>{task.task}</span>
                            <button onClick={()=> {deleteTodo(task.id)}}>Delete</button>
                            <button onClick={()=> {markAsDone(task.id)}}>Mark as Done</button>
                        </li>
                    ))
                }
            </ul>
            <button onClick={setUpperCase}>UpperCase All</button>
        </>
    )
}