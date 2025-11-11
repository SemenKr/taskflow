import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers.ts';
import style from './Checkbox.module.scss';

type CheckboxProps = {
  id: string;
  className?: string;
  checked: boolean;
  label?: string;
  eventInputHandler: (newIsDoneStatus: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const CheckBox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, eventInputHandler, id, checked, ...rest }: CheckboxProps) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      eventInputHandler(event.currentTarget.checked);
    };

    return (
      <input
        {...rest}
        aria-checked={checked}
        id={id}
        checked={checked}
        className={cn(style.todoCheckbox, className)}
        type={'checkbox'}
        onChange={onChangeHandler}
      />
    );
  }
);

CheckBox.displayName = 'CheckBox';
