import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todolistsReducer from './slices/todolistsSlice';
import tasksReducer from './slices/tasksSlice';
import { localStorageMiddleware } from './middleware/localStorageMiddleware';
import { loadState } from './utils/localStorage';

/**
 * Комбинируем reducers
 */
const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

/**
 * Получаем тип RootState ДО создания store
 * Это позволяет избежать циклической зависимости
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Загружаем сохраненный state с правильной типизацией
 */
const preloadedState = loadState<RootState>();

/**
 * Создаем Redux store
 */
export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

/**
 * Тип для dispatch
 */
export type AppDispatch = typeof store.dispatch;
