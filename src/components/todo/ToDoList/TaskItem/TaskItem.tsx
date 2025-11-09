import styles from './TaskItem.module.scss';
import { Task } from '@/types/todo.ts';
import { CheckBox } from '@components/Checkbox';

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  changeTaskStatus: (taskId: string, newIsDoneStatus: Task['isDone']) => void;
};

export const TaskItem = ({
  task,
  onDelete,
  changeTaskStatus,
}: TaskItemProps) => {
  const eventInputHandler = (newIsDoneStatus: boolean) => {
    changeTaskStatus(task.id, newIsDoneStatus);
  };

  return (
    <li className={styles.todoItem}>
      <CheckBox
        checked={task.isDone}
        id={`task-${task.id}`}
        eventInputHandler={eventInputHandler}
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
};
