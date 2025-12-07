import { ChangeEvent, KeyboardEvent, useState } from 'react';
import styles from './EditableTitle.module.scss';
import { TextInput } from '@components/common/input/TextInput.tsx';

type EditableTitleTaskProps = {
  title: string;
  onChange: (taskTitle: string) => void;
};

export const EditableTitle = ({ title, onChange }: EditableTitleTaskProps) => {
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
        <TextInput
          onChange={editTitleHandler}
          onKeyDown={keyPressHandler}
          onBlur={saveChanges}
          value={editTitle}
          autoFocus
          size={'small'}
        />
      ) : (
        <span onDoubleClick={enterEditMode} className={styles.todoText}>
          {title}
        </span>
      )}
    </>
  );
};
