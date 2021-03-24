import './App.css';
import React, { useState } from 'react';
import TodoForm from './TodoForm'
import TodoList from './TodoList'

// {
//   label: "Shantanu fgdshjfg fhskdhfgsjd fgsdhjfg sdf ghjsgd fgsdf",
//   priority: 1,
//   check: false,
//   id: Date.now(),
//   isEdit: false
// }

function App() {
  const [todos, setTodos] = useState([]);

  const saveTodo = (newTodo) => {
    if (newTodo.id) {
      let reSort = false;
      const newList = todos.map(todo => {
        if (todo.id === newTodo.id) {
          if (newTodo.priority !== todo.priority) {
            reSort = true;
          }
          return {
            ...todo,
            ...newTodo,
            isEdit: false
          }
        }
        return todo;
      });
      if (reSort) {
        newList.sort((a, b) => {
          if (a.priority < b.priority) {
            return -1;
          }
          if (a.priority > b.priority) {
            return 1;
          }
          return 0;
        })
      }
      setTodos(newList);
    } else {
      const todo = {
        ...newTodo,
        check: false,
        id: Date.now(),
        isEdit: false
      }
      const newList = [...todos, todo]
      newList.sort((a, b) => {
        if (a.priority < b.priority) {
          return -1;
        }
        if (a.priority > b.priority) {
          return 1;
        }
        return 0;
      })
      setTodos(newList);
    }
  }

  const deleteSelected = () => {
    setTodos(todos.filter(todo => !todo.check))
  }

  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId))
  }

  const selectTodo = (check, todoId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        todo.check = check;
      }
      return todo;
    }))
  }

  const editTodo = (todoId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        todo.isEdit = true;
      }
      return todo;
    }))
  }

  return (
    <div>
      <h1 style={{
        textAlign: "center"
      }}>To Do App</h1>
      <div style={{ margin: "0 auto", width: "400px" }}>
        <div>
          <button onClick={deleteSelected} >Delete Selected</button>
          <TodoForm saveTodo={saveTodo} />
        </div>
        <TodoList todos={todos} onDelete={deleteTodo} onSelect={selectTodo} onEdit={editTodo} saveTodo={saveTodo} />
      </div>
    </div>
  );
}

export default App;
