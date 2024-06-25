import { createContext, useContext } from "react";

export const TodoContext = createContext({
todos: [
  //task : It is an object so where you want to pass this task pass as object{}
  {
    id: 1,
    todo: "Todo msg",
    completed: false,
  },
  {},
  {},
],
 addTodo: (todo) => {},
 updateTodo: (id, todo) => {},
 deleteTodo: (id) => {},
 toggleComplete: (id) => {},
})

export const useTodo = () => {
  // It is a method
  return useContext(TodoContext);
};
export const TodoProvider = TodoContext.Provider; // TodoContext.Provider in React is a component that allows the TodoContext to be accessible to its child components, enabling them to subscribe to context changes and share state related to the todo list
// ab TodoProvider jahan bi use hoga wahan pe is k children ko khud ba khud is ka access mil jaye ga
// TodoContext tk access TodoProvider ya phir useTodo k zariye access kiya ja skta he