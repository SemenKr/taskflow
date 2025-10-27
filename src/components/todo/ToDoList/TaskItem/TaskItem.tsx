import styles from './TaskItem.module.scss';
import { Task } from '@/types/todo.ts';

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
};

export const TaskItem = ({ task, onDelete }: TaskItemProps) => (
  <li className={styles.todoItem}>
    <input
      className={styles.todoCheckbox}
      type="checkbox"
      id={`task-${task.id}`}
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
      onClick={() => onDelete(task.id)}
      aria-label={`Delete ${task.title}`}
    >
      ×
    </button>
  </li>
);
