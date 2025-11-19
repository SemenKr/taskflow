import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import styles from './TextInput.module.scss';

interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number' | 'search';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  success?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  maxLength?: number;
  className?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      type = 'text',
      value,
      onChange,
      placeholder,
      error,
      success,
      disabled = false,
      required = false,
      helperText,
      leftIcon,
      rightIcon,
      maxLength,
      className = '',
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      onBlur?.(e);
    };

    const inputClasses = [
      styles.input,
      leftIcon && styles.inputWithLeftIcon,
      (rightIcon || isPassword) && styles.inputWithRightIcon,
      error && styles.inputError,
      success && styles.inputSuccess,
      disabled && styles.inputDisabled,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={`${styles.container} ${className}`}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={styles.inputWrapper}>
          {leftIcon && <div className={styles.leftIcon}>{leftIcon}</div>}

          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            className={inputClasses}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.passwordToggle}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          {!isPassword && rightIcon && (
            <div className={styles.rightIcon}>{rightIcon}</div>
          )}

          {error && !rightIcon && !isPassword && (
            <div className={styles.errorIcon}>
              <AlertCircle size={20} />
            </div>
          )}

          {success && !rightIcon && !isPassword && !error && (
            <div className={styles.successIcon}>
              <Check size={20} />
            </div>
          )}
        </div>

        {(error || success || helperText || maxLength) && (
          <div className={styles.footer}>
            <div className={styles.message}>
              {error && <p className={styles.errorText}>{error}</p>}
              {success && !error && (
                <p className={styles.successText}>{success}</p>
              )}
              {helperText && !error && !success && (
                <p className={styles.helperText}>{helperText}</p>
              )}
            </div>

            {maxLength && (
              <p className={styles.counter}>
                {value?.length || 0}/{maxLength}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
