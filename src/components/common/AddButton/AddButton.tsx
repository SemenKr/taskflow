import type { FC } from 'react';
import AddIcon from '@/assets/icons/add-button.svg';
import styles from './AddButton.module.scss';
import { cn } from '@/utils/helpers.ts';

type Props = {
  onClick: () => void;
  isPulsing?: boolean;
};

export const AddButton: FC<Props> = ({ onClick, isPulsing = true }) => {
  return (
    <button
      type="button"
      className={cn(styles.addButton, isPulsing && styles.addButtonPulse)}
      onClick={onClick}
      aria-label="Добавить задачу"
    >
      <img src={AddIcon} alt="Добавить" className={styles.addButtonIcon} />
    </button>
  );
};
