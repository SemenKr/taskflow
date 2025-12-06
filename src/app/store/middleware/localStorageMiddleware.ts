import { Middleware } from '@reduxjs/toolkit';
import { saveState } from '../utils/localStorage';
import type { RootState } from '../index';

/**
 * Debounce функция - откладывает вызов
 *
 * @param func - функция для debounce
 * @param delay - задержка в миллисекундах
 */
function debounce<Args extends unknown[]>(
  func: (...args: Args) => void,
  delay: number
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Middleware для автоматического сохранения state в localStorage
 *
 * @param debounceTime - время задержки в миллисекундах
 */
export const createLocalStorageMiddleware = (
  debounceTime: number = 800
): Middleware<object, RootState> => {
  const debouncedSave = debounce((state: RootState) => {
    console.log('💾 Saving state to localStorage...');
    saveState(state);
  }, debounceTime);

  return (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    debouncedSave(state);
    return result;
  };
};

/**
 * Готовый экземпляр middleware с debounce 800мс
 */
export const localStorageMiddleware = createLocalStorageMiddleware(800);
