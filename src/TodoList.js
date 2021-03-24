import React, { useState, useRef, useEffect } from 'react';
import Todo from './Todo'
import TodoForm from './TodoForm'

const TodoList = (props) => {
  const [cursor, setCursor] = useState(-1);
  const todoRefs = useRef([]);

  const { todos, onDelete: deleteTodo, onSelect: selectTodo, onEdit: editTodo, saveTodo } = props;

  const handleKeyDown = (e, i) => {
    if (e.keyCode === 38 && cursor > 0) {
      setCursor(cursor - 1);
      todoRefs.current[i - 1].focus();
    } else if (e.keyCode === 40 && cursor < todos.length - 1) {
      setCursor(cursor + 1);
      todoRefs.current[i + 1].focus();
    } else if (e.keyCode === 13) {
      if(document.activeElement.tagName === "LI") {
        editTodo(todos[i].id);
      }
    }
  }

  return (
    <ul className="todoList" onBlur={() => setCursor(-1)}>
      {todos.map((todo, i) => {
        return (
          <li
            tabIndex="0"
            key={todo.id}
            className={cursor === i ? 'active' : null}
            onKeyDown={(e) => handleKeyDown(e, i)}
            ref={ref => todoRefs.current[i] = ref}
            onFocus={() => setCursor(i)}>
            {(todo.isEdit) ?
              <TodoForm saveTodo={(params)=>{
                saveTodo(params);
                todoRefs.current[i].focus();
              }} todoInfo={todo} />
              : <Todo todoInfo={todo} onDelete={deleteTodo} onSelect={selectTodo} onEdit={editTodo} />
            }
          </li>
        )
      })}
    </ul>
  )

}

export default TodoList;