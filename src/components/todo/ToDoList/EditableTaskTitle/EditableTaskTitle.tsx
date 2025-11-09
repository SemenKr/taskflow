import { Task } from '@/types/todo.ts';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './EditableTaskTitle.module.scss';

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

  const enterEditMode = () => {
    setIsEditMode(true);
    setEditTitle(task.title);
  };

  const saveChanges = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle.length === 0) {
      setEditTitle(task.title);
    } else {
      onChange(editTitle);
    }
    setIsEditMode(false);
  };

  const cancelChanges = () => {
    setEditTitle(task.title);
    setIsEditMode(false);
  };

  const keyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      saveChanges();
    } else if (event.key === 'Escape') {
      cancelChanges();
    }
  };

  const editTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(event.currentTarget.value);
  };

  return (
    <>
      {isEditMode ? (
        <input
          className={styles.todoInput}
          onChange={editTitleHandler}
          onKeyDown={keyPressHandler}
          onBlur={saveChanges}
          value={editTitle}
          autoFocus
        />
      ) : (
        <span
          // title={'Дважды кликните для редактирования'}
          onDoubleClick={enterEditMode}
          className={`${styles.todoText} ${styles.editable}`}
        >
          {task.title}
        </span>
      )}
    </>
  );
};
