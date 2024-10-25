import React, { useState } from 'react';
import Todo from './Todo';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Learn React', isCompleted: false },
    { id: 2, title: 'Build a Todo App', isCompleted: false },
  ]);

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
      ))}
    </div>
  );
};

export default App;