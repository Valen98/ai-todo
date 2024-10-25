import React from 'react';

const Todo = ({ todo, toggleComplete }) => {
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggleComplete(todo.id)}
      />
      <span className={todo.isCompleted ? 'completed' : ''}>{todo.title}</span>
    </div>
  );
};

export default Todo;