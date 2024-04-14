import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const serializedTodos = localStorage.getItem("todos");
    if (serializedTodos === null) {
      return [{ id: 1, text: "Hello", isDone: false }];
    }
    return JSON.parse(serializedTodos);
  } catch (error) {
    console.error("Failed to load state from local storage:", error);
    return undefined;
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedTodos = JSON.stringify(state.todos);
    localStorage.setItem("todos", serializedTodos);
  } catch (error) {
    console.error("Failed to save state to local storage:", error);
  }
};

export const todoSlice = createSlice({
  name: "todo slice",
  initialState: {
    todos: loadFromLocalStorage() || [{ id: 1, text: "Hello", isDone: false }],
  },
  reducers: {
    createTodo: (state, action) => {
      const todo = {
        id: Math.random(),
        text: action.payload.text,
        isDone: action.payload.isDone || false,
      };
      state.todos.push(todo);
      saveToLocalStorage(state);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      saveToLocalStorage(state);
    },
    updateTodo: (state, action) => {
      const { id, text, isDone } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        if (text !== undefined) existingTodo.text = text;
        if (isDone !== undefined) existingTodo.isDone = isDone;
        saveToLocalStorage(state);
      }
    },
  },
});

export const { createTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
