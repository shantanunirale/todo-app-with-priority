import React, { useState, useRef, useEffect } from 'react';
import Todo from './Todo'
import TodoForm from './TodoForm'

const TodoList = (props) => {
  const [cursor, setCursor] = useState(-1);
  const todoRefs = useRef([]);

  const initialDndState = {
    draggedFrom : null,
    draggerTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
  }

  const [dragAndDrop, setDragAndDrop] = useState(initialDndState);

  const { onReorder, todos, onDelete: deleteTodo, onSelect: selectTodo, onEdit: editTodo, saveTodo } = props;

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

  const startDragging = (event) => {
    
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: todos
    })
  }

  const onDragOver = (event) => {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(event.currentTarget.dataset.position);

    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter((item, index) => index !== draggedFrom);

    newList = [
      ...remainingItems.slice(0,draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo)
    ];
    if(draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo
      })
    }
  }

  const dropEnd = (event) => {
    setDragAndDrop({
      ...dragAndDrop,
      isDragging: false,
      draggedFrom: null,
      draggerTo: null
    })
    onReorder(dragAndDrop.updatedOrder)
  }

  return (
    <ul className="todoList" onBlur={() => setCursor(-1)}>
      {todos.map((todo, i) => {
        return (
          <li
            data-position={i}
            draggable
            onDragStart={startDragging}
            onDragOver={onDragOver}
            onDrop={dropEnd}
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