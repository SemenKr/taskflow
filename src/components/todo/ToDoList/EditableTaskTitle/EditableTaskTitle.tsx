import {
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  useImperativeHandle,
  useState,
} from 'react';
import styles from './EditableTaskTitle.module.scss';

type EditableTitleTaskProps = {
  title: string;
  onChange: (taskTitle: string) => void;
  enterEditModeRef?: RefObject<() => void>;
};

export const EditableTaskTitle = ({
  title,
  onChange,
  enterEditModeRef,
}: EditableTitleTaskProps) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>(title);

  const enterEditMode = () => {
    setIsEditMode(true);
    setEditTitle(title);
  };

  useImperativeHandle(enterEditModeRef, () => () => {
    setIsEditMode(true);
    setEditTitle(title);
  });

  const saveChanges = () => {
    const trimmedTitle = editTitle.trim();
    if (trimmedTitle.length === 0) {
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
