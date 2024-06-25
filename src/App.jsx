import { useState, useEffect } from "react";
import { TodoProvider } from "./Context/TodoContext";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
     // pehly pichli values ki access lo phir id pass karo us todo ki phir todo ko destructure kr do aur phir prev ko destructure kr do
     // The spread operator (...) is used to copy all properties from the todo object into the new todo object.
     // ...prev: The spread operator is also used here to include all the previous todo items from the prev state in the new array.
  };
  const updateTodo = (id, todo)=>{ // k  mn chahta hon k falan id pe ye todo update kr do to phir iteration pe jahan wo id match ho jaye to todo wahan daal dena
    setTodos((prev) => prev.map((prevTodo)=> (prevTodo.id === id ? todo : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo)=> //The filter method creates a new array containing only the todos that do not have the id passed to the deleteTodo function.
      todo.id !== id
    ))
  }
  const toggleComplete = (id) =>{
    setTodos((prev)=>prev.map((prevTodo)=>prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed}: prevTodo))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length > 0) {
      setTodos(todos)
    }
  }, []) // localStorage se values ko aik jagah ikhatha krny k liye
  // localStorage ka aik kaam ye samajh ata he k jo data page pe save kiya jaye wo reload k sath bi save rahy
  

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos]) // todos mn agr koe change ho to localStorage mn khud ba khud change ho jaye
  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
              <div key={todo.id} // project mn kafi sary divs han to keys ka istmal kiya jaye ga ta k access asani se mil jaye
              className="w-full">
              <TodoItem todo={todo} /> 
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}
// TodoItem mn prop pass krna zarori he
export default App;
