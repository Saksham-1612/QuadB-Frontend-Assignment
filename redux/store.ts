import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todo";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
});

// typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
