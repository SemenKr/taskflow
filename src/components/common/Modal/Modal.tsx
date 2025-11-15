import styles from './Modal.module.scss';
import { ReactNode, MouseEvent } from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  const overlayClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={overlayClickHandler}>
      <div className={styles.modalWindow}>{children}</div>
    </div>
  );
};
