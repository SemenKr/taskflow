import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react';
import style from './TextInput.module.scss';
import { cn } from '@/utils/helpers.ts';

type TextInputProps = {
  inputValue: string;
  eventInputHandler: (value: string) => void;
  onKeyDown: () => void;
  hasError?: boolean;
  disabled?: boolean;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      inputValue,
      eventInputHandler,
      onKeyDown,
      hasError = false,
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      eventInputHandler(event.currentTarget.value);
    };

    return (
      <input
        {...rest}
        className={cn(
          style.todoInput,
          hasError && style.todoInputError,
          disabled && style.todoInputDisabled,
          className
        )}
        value={inputValue}
        ref={ref}
        onChange={onChangeHandler}
        onKeyDown={(e) => e.key === 'Enter' && onKeyDown()}
        disabled={disabled}
      />
    );
  }
);

TextInput.displayName = 'TextInput';
