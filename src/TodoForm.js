import React, { useRef, useState, useEffect } from "react";

const TodoAddForm = (props) => {
  const { saveTodo, todoInfo } = props;
  const [priority, setPriority] = useState(10)
  const inputField = useRef('');

  useEffect(() => {
    inputField.current.focus();
    if (todoInfo && todoInfo.id) {
      inputField.current.value = todoInfo.label;
      setPriority(todoInfo.priority)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoLabel = inputField.current.value;
    if (todoInfo && todoInfo.id) {
      saveTodo({
        label: todoLabel,
        priority,
        id: todoInfo.id
      });
    } else {
      saveTodo({
        label: todoLabel,
        priority
      });
    }

    resetForm();
  }

  const resetForm = () => {
    inputField.current.value = "";
    setPriority(10)
  }

  return (
    <form onSubmit={handleSubmit} className="todoForm" data-testid={(todoInfo && todoInfo.id)? "editForm": "addForm"}>
      <input placeholder={(todoInfo && todoInfo.id)? `Edit Todo` : "Add Todo"} type="text" name="todoLabel" ref={inputField} data-testid={(todoInfo && todoInfo.id)? `editLabel${todoInfo.id}` : "addLabel"} />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} name="priority" data-testid={(todoInfo && todoInfo.id)? `editPriority${todoInfo.id}` : "addPriority"}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item =>
          <option key={item}>{item}</option>
        )}
      </select>
      <button type="submit" disabled={inputField.current.value && inputField.current.value.length === 0}>{(todoInfo && todoInfo.id) ? 'Save' : 'Add'}</button>
    </form>
  )
}
export default TodoAddForm