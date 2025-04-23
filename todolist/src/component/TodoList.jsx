import { useState, useEffect } from 'react';
import axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('https://6808318f942707d722dd86b9.mockapi.io/todo')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
  }, []);

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Danh sách công việc</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <span> - {todo.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</span>
            <button onClick={() => handleDelete(todo.id)}>Xoá</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
