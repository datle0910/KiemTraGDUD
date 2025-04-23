import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://6808318f942707d722dd86b9.mockapi.io/todo';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // all | completed | incomplete

  // Lấy dữ liệu từ API
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTodos(response.data))
      .catch(error => console.error('Lỗi khi tải dữ liệu:', error));
  }, []);

  // Thêm công việc mới
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

  // Xoá công việc
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Lỗi khi xoá công việc:', error);
    }
  };

  // Toggle hoàn thành công việc
  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !currentStatus
      });

      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, completed: response.data.completed } : todo
        )
      );
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái công việc:', error);
    }
  };

  // Lọc danh sách công việc
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true; // 'all'
  });

  // Tính tổng số công việc và số công việc hoàn thành
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div style={{ padding: '20px' }}>
      <h1>📋 Danh sách công việc</h1>

      {/* Hiển thị tổng số công việc và số công việc hoàn thành */}
      <div style={{ marginBottom: '15px' }}>
        <p>
          <strong>Tổng:</strong> {totalTodos} | <strong>Hoàn thành:</strong> {completedTodos}
        </p>
      </div>

      {/* Form thêm công việc */}
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nhập công việc..."
        />
        <button onClick={handleAdd}>Thêm</button>
      </div>

      {/* Bộ lọc công việc */}
      <div style={{ marginBottom: '15px' }}>
        <button onClick={() => setFilter('all')} style={{ marginRight: '8px' }}>
          Tất cả
        </button>
        <button onClick={() => setFilter('completed')} style={{ marginRight: '8px' }}>
          Đã hoàn thành
        </button>
        <button onClick={() => setFilter('incomplete')}>
          Chưa hoàn thành
        </button>
      </div>

      {/* Danh sách công việc */}
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id, todo.completed)}
            />
            <span style={{ marginLeft: '8px' }}>{todo.text}</span> - 
            <strong>{todo.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</strong>
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: '10px' }}>
              Xoá
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
