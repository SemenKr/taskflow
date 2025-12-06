import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import { Button } from '@components/common/Button/Button.tsx';

type ModalLayoutProps = {
  title: string;
  children: ReactNode;
  onCancel: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmDisabled?: boolean;
};

export const ModalLayout = ({
  title,
  children,
  onCancel,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  confirmDisabled,
}: ModalLayoutProps) => {
  return (
    <>
      <h3 className={styles.modalTitle}>{title}</h3>
      <div>{children}</div>

      <div className={styles.modalAction}>
        <Button onClick={onCancel}>{cancelText}</Button>

        {onConfirm && (
          <Button onClick={onConfirm} disabled={confirmDisabled}>
            {confirmText}
          </Button>
        )}
      </div>
    </>
  );
};
