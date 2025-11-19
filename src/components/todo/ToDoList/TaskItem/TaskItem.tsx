import styles from './TaskItem.module.scss';
import { Task } from '@/types/todo.ts';
import { EditableTaskTitle } from '@components/todo/ToDoList/EditableTaskTitle/EditableTaskTitle.tsx';
import { Icon } from '@components/common/Icon/Icon.tsx';
import { Button } from '@components/common/Button/Button.tsx';

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  changeTaskStatus: (taskId: string, newIsDoneStatus: Task['isDone']) => void;
  changeTaskTitle: (taskId: string, taskTitle: string) => void;
  openModal: (taskId: string, taskTitle: string) => void;
};

export const TaskItem = ({
  task,
  onDelete,
  changeTaskStatus,
  changeTaskTitle,
  openModal,
}: TaskItemProps) => {
  const onChangeHandler = (taskTitle: string) => {
    changeTaskTitle(task.id, taskTitle);
  };

  const onEditHandler = () => {
    openModal(task.id, task.title);
  };

  return (
    <li className={styles.todoItem}>
      <input
        className={styles.todoCheckbox}
        type="checkbox"
        id={`task-${task.id}`}
        checked={task.isDone}
        onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
      />
      <EditableTaskTitle title={task.title} onChange={onChangeHandler} />
      <div className={styles.todoIcons}>
        <Button
          onClick={onEditHandler}
          aria-label={`Edit ${task.title}`}
          startIcon={
            <Icon
              name={'edit'}
              size={'14'}
              color={'#CDCDCD'}
              hoverColor={'#6C63FF'}
            />
          }
          iconOnly
          variant="ghost"
        />
        <Button
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
          startIcon={
            <Icon
              name={'delete'}
              size={'16'}
              color={'#CDCDCD'}
              hoverColor={'#E50000'}
            />
          }
          iconOnly
          variant="ghost-danger"
        />
      </div>
    </li>
  );
};
