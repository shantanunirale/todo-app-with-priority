import React from "react";

const Todo = ({ todoInfo, onDelete, onEdit, onSelect }) => {
  const {label, id, check} = todoInfo;
  return (
    <div className="todo" data-testid="todo">
      <i class="fad fa-arrows-alt"></i>
      <input type="checkbox" onChange={(e)=>onSelect(e.target.checked, id)} checked={check} />
      <span onDoubleClick={()=>onEdit(id)} data-testid="todo-label">{label}</span>
      <button tabIndex="0" onClick={(e)=> {e.stopPropagation();onDelete(id);}} className="deleteIcon" data-testid="delete">
        <i className="fas fa-trash-alt" role="button"></i>
      </button>
    </div>
  )
}

export default Todo;