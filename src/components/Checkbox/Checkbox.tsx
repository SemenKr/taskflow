import { ChangeEvent } from 'react';
import { cn } from '@/utils/helpers.ts';
import style from './Checkbox.module.scss';

type CheckboxProps = {
  id: string;
  className?: string;
  checked: boolean;
  eventInputHandler: (newIsDoneStatus: boolean) => void;
};

export const CheckBox = ({
  className,
  eventInputHandler,
  id,
  checked,
}: CheckboxProps) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    eventInputHandler(event.currentTarget.checked);
  };

  return (
    <input
      id={id}
      checked={checked}
      className={cn(style.todoCheckbox, className)}
      type={'checkbox'}
      onChange={onChangeHandler}
    />
  );
};
