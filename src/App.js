import './App.css';
import React, { useState } from 'react';
import TodoForm from './TodoForm'
import TodoList from './TodoList'



function App() {
  const [todos, setTodos] = useState([{
    label: "Shantanu1",
    check: false,
    id: 1,
    isEdit: false
  },
  {
    label: "Shantanu2",
    check: false,
    id: 2,
    isEdit: false
  },
  {
    label: "Shantanu3",
    check: false,
    id: 3,
    isEdit: false
  }]);

  const saveTodo = (newTodo) => {
    if (newTodo.id) {
      const newList = todos.map(todo => {
        if (todo.id === newTodo.id) {
          return {
            ...todo,
            ...newTodo,
            isEdit: false
          }
        }
        return todo;
      });
      setTodos(newList);
    } else {
      const todo = {
        ...newTodo,
        check: false,
        id: Date.now(),
        isEdit: false
      }
      const newList = [...todos, todo]
      setTodos(newList);
    }
  }

  const onReorder = (todos) => {
    setTodos(todos)
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
        <TodoList onReorder={onReorder} todos={todos} onDelete={deleteTodo} onSelect={selectTodo} onEdit={editTodo} saveTodo={saveTodo} />
      </div>
    </div>
  );
}

export default App;
