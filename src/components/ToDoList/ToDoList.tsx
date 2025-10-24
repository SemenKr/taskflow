import { useState } from 'react';
import type { Task } from '../../types/todo.ts';
import styles from './ToDoList.module.scss';
import { SwitchToggle } from '../switchToggle/switchToggle.tsx';

type Props = {
  title: string;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
  deleteAllTasks: () => void;
  addTask: (taskTitle: string) => void;
};

export const ToDoList = ({
  title,
  tasks,
  deleteTask,
  deleteAllTasks,
  addTask,
}: Props) => {
  const [inputValue, setInputValue] = useState('');

  const addTaskHandler = () => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    addTask(trimmedValue);
    setInputValue('');
  };

  return (
    <div className={styles.todo}>
      <SwitchToggle />
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
                checked={task.isDone}
                readOnly
              />
              <span
                className={`${styles.todoText} ${
                  task.isDone ? styles.done : ''
                }`}
              >
                {task.title}
              </span>

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
