import { useState } from 'react';
import type { Task } from '../../types/todo.ts';
import styles from './ToDoList.module.scss';
import { SwitchToggle } from '../switchToggle/SwitchToggle.tsx';

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  deleteAllTasks: () => void;
  addTask: (taskTitle: string) => void;
  switchMode: () => void;
  isDark: boolean;
};

export const ToDoList = ({
  title,
  tasks,
  isDark,
  deleteTask,
  deleteAllTasks,
  addTask,
  switchMode,
}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const addTaskHandler = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    addTask(trimmedValue);
    setInputValue('');
  };

  return (
    <div className={styles.todo} data-theme={isDark ? 'dark' : 'light'}>
      <SwitchToggle onDarkHandler={switchMode} />
      <h3 className={styles.todoTitle}>{title}</h3>

      <div className={styles.todoInputWrapper}>
        <input
          className={styles.todoInput}
          placeholder="add new Task..."
          value={inputValue}
          type="text"
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTaskHandler()}
        />
        <button
          className={styles.todoAddButton}
          onClick={addTaskHandler}
          aria-label="Add task"
          disabled={!inputValue.trim()}
        >
          +
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className={styles.todoEmpty}>Тасок нет</p>
      ) : (
        <ul className={styles.todoList}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.todoItem}>
              <input
                className={styles.todoCheckbox}
                type="checkbox"
                id={`task-${task.id}`}
                name={`task-${task.id}`}
                checked={task.isDone}
                readOnly
              />
              <label
                htmlFor={`task-${task.id}`}
                className={`${styles.todoText} ${task.isDone ? styles.done : ''}`}
              >
                {task.title}
              </label>
              <button
                className={styles.todoDeleteButton}
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete task ${task.title}`}
                title="Delete task"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        className={styles.secondaryButton}
        onClick={deleteAllTasks}
        disabled={tasks.length === 0}
      >
        Delete All Tasks
      </button>
    </div>
  );
};
