import { useState, ChangeEvent, KeyboardEvent } from 'react';

export const useEditModal = (
  onApply: (value: string, id?: string | null) => void
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const [originalValue, setOriginalValue] = useState('');
  const [entityId, setEntityId] = useState<string | null>(null);

  const open = (id: string | null = null, initialValue: string = '') => {
    setEntityId(id);
    setValue(initialValue);
    setOriginalValue(initialValue);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const isApplyDisabled =
    value.trim() === '' || value.trim() === originalValue.trim();

  const apply = () => {
    if (!isApplyDisabled) {
      onApply(value.trim(), entityId);
      close();
    }
  };

  const keyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isApplyDisabled) {
        close();
      } else {
        apply();
      }
    }
  };

  return {
    isOpen,
    value,
    changeHandler,
    keyHandler,
    isApplyDisabled,
    open,
    close,
    apply,
    entityId,
  };
};
