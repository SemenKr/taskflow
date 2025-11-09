import { ChangeEvent, Ref } from 'react';
import style from './TextInput.module.scss';
import { cn } from '@/utils/helpers.ts';

type TextInputProps = {
  inputValue: string;
  inputRef: Ref<HTMLInputElement | null>;
  placeholder: string;
  eventInputHandler: (value: string) => void;
  onKeyDown: () => void;
  hasError?: boolean;
  disabled?: boolean;
  className?: string;
};

export const TextInput = ({
  inputValue,
  inputRef,
  placeholder,
  eventInputHandler,
  onKeyDown,
  hasError = false,
  disabled = false,
  className,
}: TextInputProps) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    eventInputHandler(event.currentTarget.value);
  };

  return (
    <input
      className={cn(
        style.todoInput,
        hasError && style.todoInputError,
        disabled && style.todoInputDisabled,
        className
      )}
      placeholder={placeholder}
      value={inputValue}
      ref={inputRef}
      onChange={onChangeHandler}
      onKeyDown={(e) => e.key === 'Enter' && onKeyDown()}
    />
  );
};
