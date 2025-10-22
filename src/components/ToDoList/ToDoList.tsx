import type { Task } from '../../types/todo.ts';
import { useState } from 'react';

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

    if (!trimmedValue) {
      // TODO Можно показать сообщение об ошибке
      return;
    }
    addTask(trimmedValue);
    setInputValue('');
  };

  return (
    <div className={styles.todo}>
      <h3>{title}</h3>
      <div>
        <input
          placeholder={'add new Task...'}
          value={inputValue}
          type="text"
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTaskHandler()}
        />
        <button
          onClick={addTaskHandler}
          aria-label="Add task"
          disabled={!inputValue.trim()}
        >
          +
        </button>
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete task ${task.title}`}
                  title="Delete task"
                >
                  x
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <button onClick={() => deleteAllTasks()} disabled={tasks.length === 0}>
        Delete All Tasks
      </button>
    </div>
  );
};
