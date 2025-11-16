import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './EditableTaskTitle.module.scss';

type EditableTitleTaskProps = {
  title: string;
  onChange: (taskTitle: string) => void;
};

export const EditableTaskTitle = ({
  title,
  onChange,
}: EditableTitleTaskProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);

  const enterEditMode = () => {
    setIsEditMode(true);
    setEditTitle(title);
  };

  const saveChanges = () => {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setEditTitle(title);
    } else {
      onChange(editTitle);
    }
    setIsEditMode(false);
  };

  const cancelChanges = () => {
    setEditTitle(title);
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
        <span onDoubleClick={enterEditMode} className={styles.todoText}>
          {title}
        </span>
      )}
    </>
  );
};
