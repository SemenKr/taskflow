import styles from './TaskItem.module.scss';
import { Task } from '@/types/todo.ts';

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  changeTaskStatus: (taskId: string, newIsDoneStatus: Task['isDone']) => void;
};

export const TaskItem = ({
  task,
  onDelete,
  changeTaskStatus,
}: TaskItemProps) => (
  <li className={styles.todoItem}>
    <input
      className={styles.todoCheckbox}
      type="checkbox"
      id={`task-${task.id}`}
      checked={task.isDone}
      onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
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
