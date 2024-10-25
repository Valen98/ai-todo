import React, { useState, useEffect, useRef } from 'react';
import Todo from './Todo';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Learn React', isCompleted: false },
    { id: 2, title: 'Build a Todo App', isCompleted: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    const newTodoItem = {
      id: todos.length + 1,
      title: newTodo,
      isCompleted: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % todos.length);
    }, 5000);
  };

  useEffect(() => {
    resetInterval();
    return () => clearInterval(intervalRef.current);
  }, [todos.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * 320}px)`;
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + todos.length) % todos.length);
    resetInterval();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % todos.length);
    resetInterval();
  };

  return (
    <>
      <div className="app">
        <h1>Todo List</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="carousel-container">
        <button className="carousel-button left" onClick={handlePrev}>
          &#8249;
        </button>
        <div className="carousel" ref={carouselRef}>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
          ))}
        </div>
        <button className="carousel-button right" onClick={handleNext}>
          &#8250;
        </button>
      </div>
    </>
  );
};

export default App;