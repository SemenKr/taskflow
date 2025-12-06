import { configureStore } from '@reduxjs/toolkit';
import todolistsReducer from './slices/todolistsSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
