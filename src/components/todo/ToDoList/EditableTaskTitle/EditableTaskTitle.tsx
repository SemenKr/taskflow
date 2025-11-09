import { Task } from '@/types/todo.ts';
import styles from '../TaskItem/TaskItem.module.scss';
import { ChangeEvent, useState } from 'react';

type EditableTitleTaskProps = {
  task: Task;
  onChange: (taskTitle: string) => void;
};

export const EditableTaskTitle = ({
  task,
  onChange,
}: EditableTitleTaskProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(task.title);

  const toggleEditModeHandler = () => {
    setIsEditMode(!isEditMode);
    onChange(editTitle);
  };

  const editTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.currentTarget.value);
  };

  return (
    <>
      {isEditMode ? (
        <input
          onChange={editTitleHandler}
          onBlur={toggleEditModeHandler}
          value={editTitle}
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={toggleEditModeHandler}
          // htmlFor={`task-${task.id}`}
          className={`${styles.todoText} ${task.isDone ? styles.done : ''}`}
        >
          {task.title}
        </span>
      )}
    </>
  );
};
