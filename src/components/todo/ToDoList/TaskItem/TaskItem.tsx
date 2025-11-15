import styles from './TaskItem.module.scss';
import { Task } from '@/types/todo.ts';
import { EditableTaskTitle } from '@components/todo/ToDoList/EditableTaskTitle/EditableTaskTitle.tsx';
import { Icon } from '@components/common/Icon/Icon.tsx';
import { useRef } from 'react';

type TaskItemProps = {
  task: Task;
  onDelete: (id: string) => void;
  changeTaskStatus: (taskId: string, newIsDoneStatus: Task['isDone']) => void;
  changeTaskTitle: (taskId: string, taskTitle: string) => void;
  openModal: (title: string) => void;
};

export const TaskItem = ({
  task,
  onDelete,
  changeTaskStatus,
  changeTaskTitle,
  openModal,
}: TaskItemProps) => {
  const editModeRef = useRef<(() => void) | null>(null);

  const onChangeHandler = (taskTitle: string) => {
    changeTaskTitle(task.id, taskTitle);
  };

  const onEditHandler = () => {
    openModal(task.title);
    // if (editModeRef.current) {
    //   editModeRef.current();
    // }
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
      <EditableTaskTitle
        title={task.title}
        onChange={onChangeHandler}
        enterEditModeRef={editModeRef}
      />
      <div className={styles.todoIcons}>
        <button
          className={styles.todoButton}
          onClick={onEditHandler}
          aria-label={`Edit ${task.title}`}
        >
          <Icon
            name={'edit'}
            size={'14'}
            color={'#CDCDCD'}
            hoverColor={'#6C63FF'}
          />
        </button>

        <button
          className={styles.todoButton}
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          <Icon
            name={'delete'}
            size={'16'}
            color={'#CDCDCD'}
            hoverColor={'#E50000'}
          />
        </button>
      </div>
    </li>
  );
};
