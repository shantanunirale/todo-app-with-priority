import React, { useRef, useState, useEffect } from "react";

const TodoAddForm = (props) => {
  const { saveTodo, todoInfo } = props;
  const inputField = useRef('');

  useEffect(() => {
    inputField.current.focus();
    if (todoInfo && todoInfo.id) {
      inputField.current.value = todoInfo.label;
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoLabel = inputField.current.value;
    if (todoInfo && todoInfo.id) {
      saveTodo({
        label: todoLabel,
        id: todoInfo.id
      });
    } else {
      saveTodo({
        label: todoLabel,
      });
    }

    resetForm();
  }

  const resetForm = () => {
    inputField.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="todoForm" data-testid={(todoInfo && todoInfo.id)? "editForm": "addForm"}>
      <input placeholder={(todoInfo && todoInfo.id)? `Edit Todo` : "Add Todo"} type="text" name="todoLabel" ref={inputField} data-testid={(todoInfo && todoInfo.id)? `editLabel${todoInfo.id}` : "addLabel"} />
      <button type="submit" disabled={inputField.current.value && inputField.current.value.length === 0}>{(todoInfo && todoInfo.id) ? 'Save' : 'Add'}</button>
    </form>
  )
}
export default TodoAddForm