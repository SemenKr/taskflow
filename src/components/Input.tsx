import { ChangeEvent, Ref } from 'react';

type InputProps = {
  inputValue?: string;
  inputRef?: Ref<HTMLInputElement | null>;
  className: string;
  placeholder?: string;
  eventInputHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: () => void;
  type: string;
};

export const Input = ({
  inputValue,
  inputRef,
  className,
  placeholder,
  eventInputHandler,
  onKeyDown,
  type,
}: InputProps) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    eventInputHandler(event);
  };

  return (
    <input
      className={className}
      placeholder={placeholder}
      value={inputValue}
      type={type}
      ref={inputRef}
      onChange={onChangeHandler}
      onKeyDown={(e) => e.key === 'Enter' && onKeyDown?.()}
    />
  );
};
