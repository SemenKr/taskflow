/**
 * Утилиты для работы с localStorage
 * Используют generic типы чтобы избежать циклических зависимостей
 */

const STORAGE_KEY = 'taskflow_state';

/**
 * Загружает state из localStorage
 *
 * @returns Объект state или undefined если данных нет
 */
export const loadState = <T = unknown>(): T | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState) as T;
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return undefined;
  }
};

/**
 * Сохраняет state в localStorage
 *
 * @param state - state для сохранения
 */
export const saveState = <T = unknown>(state: T): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
    console.log('✅ State saved successfully');
  } catch (error) {
    console.error('❌ Error saving state to localStorage:', error);

    // Проверяем конкретную ошибку
    if (error instanceof Error) {
      if (error.name === 'QuotaExceededError') {
        console.error('⚠️ localStorage quota exceeded!');
      }
    }
  }
};

/**
 * Очищает сохраненный state
 */
export const clearState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('🗑️ State cleared from localStorage');
  } catch (error) {
    console.error('Error clearing state from localStorage:', error);
  }
};
