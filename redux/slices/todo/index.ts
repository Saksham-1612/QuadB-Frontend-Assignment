import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  initialState: {
    todos: [{ id: 1, text: "Hello", isDone: false }],
  },
  name: "todo slice",
  reducers: {
    createTodo: (state, actions) => {
      const todo = {
        id: Math.random(),
        text: actions.payload.text,
        isDone: actions.payload.isDone,
      };
      console.log(todo);
      state.todos.push(todo);
    },
    removeTodo: (state, actions) => {
      state.todos = state.todos.filter(
        (todo) => todo.id !== actions.payload.id
      );
    },
    updateTodo: (state, action) => {
      const { id, updatedTodo } = action.payload;
      console.log(updatedTodo);
      const existingTodoIndex = state.todos.findIndex((todo) => todo.id === id);
      console.log(existingTodoIndex);

      if (existingTodoIndex !== -1) {
        state.todos[existingTodoIndex] = {
          ...state.todos[existingTodoIndex],
          ...updatedTodo,
        };
      }
    },
  },
});

export const { createTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
