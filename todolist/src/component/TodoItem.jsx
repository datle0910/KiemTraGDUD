// TodoItem.js
import React from 'react';

function TodoItem({ todo, onToggleComplete, onDelete }) {
  return (
    <li className="flex items-center p-3 bg-white shadow-md rounded-md mb-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id, todo.completed)}
        className="mr-3"
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.text}
      </span>
      <button 
        onClick={() => onDelete(todo.id)} 
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        Xoá
      </button>
    </li>
  );
}

export default TodoItem;
