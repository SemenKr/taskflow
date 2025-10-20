import { Task } from '../../types/todo.ts';
import styles from './ToDoList.module.scss';

type Props = {
  title: string;
  tasks: Task[];
};

export const ToDoList = ({ title, tasks }: Props) => {
  return (
    <div className={styles.todo}>
      <h3>{title}</h3>
      <div>
        <input type="text" placeholder="Новая задача..." />
        <button>+</button>
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} readOnly />
              <span>{task.title}</span>
              <button>x</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
