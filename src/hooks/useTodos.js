import React, { useState } from "react";
//Custom hooks para poder reutilizar lógica
export const useTodos = () => {
  const [todos, setTodos] = useState([
    {
      text: "Todo 1",
      isCompleted: false,
    },
    {
      text: "Todo 2",
      isCompleted: false,
    },
    {
      text: "Todo 3",
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [{ text }, ...todos];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return {
    todos,
    addTodo,
    completeTodo,
    removeTodo,
  };
};
