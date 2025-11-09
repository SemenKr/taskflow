import styles from './TaskItem.module.scss';
import { Task } from '@/types/todo.ts';
import { EditableTaskTitle } from '@components/todo/ToDoList/EditableTaskTitle/EditableTaskTitle.tsx';

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  changeTaskStatus: (taskId: string, newIsDoneStatus: Task['isDone']) => void;
  changeTaskTitle: (taskId: string, taskTitle: string) => void;
};

export const TaskItem = ({
  task,
  onDelete,
  changeTaskStatus,
  changeTaskTitle,
}: TaskItemProps) => (
  <li className={styles.todoItem}>
    <input
      className={styles.todoCheckbox}
      type="checkbox"
      id={`task-${task.id}`}
      checked={task.isDone}
      onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
    />
    <EditableTaskTitle
      task={task}
      onChange={(taskTitle) => changeTaskTitle(task.id, taskTitle)}
    />
    <button
      className={styles.todoDeleteButton}
      onClick={() => onDelete(task.id)}
      aria-label={`Delete ${task.title}`}
    >
      ×
    </button>
  </li>
);
