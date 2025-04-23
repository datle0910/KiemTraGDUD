import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://6808318f942707d722dd86b9.mockapi.io/todo';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
  }, []);

  const handleAdd = async () => {
    if (newTodo.trim() === '') return;

    const todo = {
      text: newTodo,
      completed: false
    };

    try {
      const response = await axios.post(API_URL, todo);
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Lỗi khi thêm công việc:', error);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>📋 Danh sách công việc</h1>

      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nhập công việc..."
        />
        <button onClick={handleAdd}>Thêm</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span>{todo.text}</span> - 
            <strong>{todo.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</strong>
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '10px' }}>Xoá</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
