import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import type { TodolistType } from '@/types/todo';

// Генерируем ID сразу при инициализации модуля
export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: TodolistType[] = [
  { id: todolistId1, title: 'What to learn', filter: 'all' },
  { id: todolistId2, title: 'What to buy', filter: 'all' },
];

const todolistsSlice = createSlice({
  name: 'todolists',
  initialState,
  reducers: {
    addTodolist: {
      reducer: (
        state,
        action: PayloadAction<{ id: string; title: string }>
      ) => {
        const newTodolist: TodolistType = {
          id: action.payload.id,
          title: action.payload.title,
          filter: 'all',
        };
        state.unshift(newTodolist);
      },
      prepare: (title: string) => {
        return {
          payload: {
            id: v1(),
            title,
          },
        };
      },
    },

    removeTodolist: (state, action: PayloadAction<string>) => {
      return state.filter((todolist) => todolist.id !== action.payload);
    },

    changeTodolistTitle: (
      state,
      action: PayloadAction<{ todolistId: string; title: string }>
    ) => {
      const todolist = state.find((tl) => tl.id === action.payload.todolistId);
      if (todolist) {
        todolist.title = action.payload.title;
      }
    },

    changeTodolistFilter: (
      state,
      action: PayloadAction<{
        todolistId: string;
        filter: TodolistType['filter'];
      }>
    ) => {
      const todolist = state.find((tl) => tl.id === action.payload.todolistId);
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    },
  },
});

export const {
  addTodolist,
  removeTodolist,
  changeTodolistTitle,
  changeTodolistFilter,
} = todolistsSlice.actions;

export default todolistsSlice.reducer;
