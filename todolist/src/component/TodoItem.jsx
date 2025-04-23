// TodoItem.js
import React from 'react';

function TodoItem({ todo, onToggleComplete, onDelete }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id, todo.completed)}
      />
      <span style={{ marginLeft: '8px' }}>{todo.text}</span> - 
      <strong>{todo.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</strong>
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: '10px' }}>
        Xoá
      </button>
    </li>
  );
}

export default TodoItem;
