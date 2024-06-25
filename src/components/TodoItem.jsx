import React, { useState } from 'react'
import { useTodo } from '../Context/TodoContext'

function TodoItem({todo}) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const {updateTodo, deleteTodo, toggleComplete} = useTodo() // functionality dalny k liye ye yahan dalien gy

    const editTodo=()=>{
        updateTodo(todo.id, {...todo, todo: todoMsg}) // todo aik object us waja se curly braces mn pass kiya he
        // updateTodo(todo.id=>todo tk access hoe, phir ...todo se todo ko khol k rakha, phir todoMsg pass kr dena)
        setIsTodoEditable(false)
    }
    const toggleCompleted = () =>{
        toggleComplete(todo.id)
    }
  return (
    <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                // checked: This is an attribute for input elements of type checkbox. When set to true, the checkbox appears checked. When set to false, the checkbox appears unchecked.
                 // The value of todo.completed is a boolean (true or false).
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable} //
                // This means the input field will be read-only when isTodoEditable is false and editable when isTodoEditable is true.
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
  )
}

export default TodoItem
