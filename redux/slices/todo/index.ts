import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  isDone: boolean;
}

interface TodoState {
  todos: Todo[];
}

const loadFromLocalStorage = (): Todo[] | undefined => {
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

const saveToLocalStorage = (todos: Todo[]): void => {
  try {
    const serializedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", serializedTodos);
  } catch (error) {
    console.error("Failed to save state to local storage:", error);
  }
};

export const todoSlice = createSlice({
  name: "todo slice",
  initialState: {
    todos: loadFromLocalStorage() || [{ id: 1, text: "Hello", isDone: false }],
  } as TodoState,
  reducers: {
    createTodo: (
      state,
      action: PayloadAction<{ text: string; isDone?: boolean }>
    ) => {
      const newTodo: Todo = {
        id: Math.random(),
        text: action.payload.text,
        isDone: action.payload.isDone || false,
      };
      state.todos.push(newTodo);
      saveToLocalStorage(state.todos);
    },
    removeTodo: (state, action: PayloadAction<{ id: number }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      saveToLocalStorage(state.todos);
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: number; text?: string; isDone?: boolean }>
    ) => {
      const { id, text, isDone } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        if (text !== undefined) existingTodo.text = text;
        if (isDone !== undefined) existingTodo.isDone = isDone;
        saveToLocalStorage(state.todos);
      }
    },
  },
});

export const { createTodo, removeTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
