// TodoList.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const API_URL = 'https://6808318f942707d722dd86b9.mockapi.io/todo';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // all | completed | incomplete

  // Lấy dữ liệu từ localStorage khi trang được tải lại
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      // Nếu không có dữ liệu trong localStorage, lấy từ API
      axios.get(API_URL)
        .then(response => setTodos(response.data))
        .catch(error => console.error('Lỗi khi tải dữ liệu từ API:', error));
    }
  }, []);

  // Lưu danh sách công việc vào localStorage mỗi khi todos thay đổi
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

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
    <div className="max-w-4xl mx-auto p-5 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">📋 Danh sách công việc</h1>

      {/* Hiển thị tổng số công việc và số công việc hoàn thành */}
      <div className="text-lg mb-6">
        <strong>Tổng:</strong> {totalTodos} | <strong>Hoàn thành:</strong> {completedTodos}
      </div>

      {/* Form thêm công việc */}
      <div className="flex mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Nhập công việc..."
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAdd}
          className="ml-3 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Thêm
        </button>
      </div>

      {/* Bộ lọc công việc */}
      <div className="mb-6 text-center">
        <button 
          onClick={() => setFilter('all')} 
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mx-2"
        >
          Tất cả
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mx-2"
        >
          Đã hoàn thành
        </button>
        <button 
          onClick={() => setFilter('incomplete')} 
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mx-2"
        >
          Chưa hoàn thành
        </button>
      </div>

      {/* Danh sách công việc */}
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
