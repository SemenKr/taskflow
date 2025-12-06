import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import type { TasksStateType, TaskType } from '@/types/todo';
import { todolistId1, todolistId2 } from './todolistsSlice';

const initialState: TasksStateType = {
  [todolistId1]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: true },
    { id: v1(), title: 'GraphQL', isDone: false },
  ],
  [todolistId2]: [
    { id: v1(), title: 'Rest API', isDone: true },
    { id: v1(), title: 'GraphQL', isDone: false },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ todolistId: string; title: string }>
    ) => {
      const { todolistId, title } = action.payload;
      const newTask: TaskType = {
        id: v1(),
        title,
        isDone: false,
      };
      if (!state[todolistId]) {
        state[todolistId] = [];
      }
      state[todolistId].unshift(newTask);
    },

    removeTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string }>
    ) => {
      const { todolistId, taskId } = action.payload;
      state[todolistId] = state[todolistId].filter(
        (task) => task.id !== taskId
      );
    },

    removeAllTasks: (state, action: PayloadAction<string>) => {
      state[action.payload] = [];
    },

    changeTaskTitle: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        title: string;
      }>
    ) => {
      const { todolistId, taskId, title } = action.payload;
      const task = state[todolistId]?.find((t) => t.id === taskId);
      if (task) {
        task.title = title;
      }
    },

    changeTaskStatus: (
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        isDone: boolean;
      }>
    ) => {
      const { todolistId, taskId, isDone } = action.payload;
      const task = state[todolistId]?.find((t) => t.id === taskId);
      if (task) {
        task.isDone = isDone;
      }
    },

    // Добавляем обработчики для синхронизации с todolistsSlice
    addEmptyTasksArray: (state, action: PayloadAction<string>) => {
      state[action.payload] = [];
    },

    removeTodolistTasks: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const {
  addTask,
  removeTask,
  removeAllTasks,
  changeTaskTitle,
  changeTaskStatus,
  addEmptyTasksArray,
  removeTodolistTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
