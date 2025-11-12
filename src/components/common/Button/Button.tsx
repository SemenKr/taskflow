import React from 'react';
import styles from './Button.module.scss';
import { cn } from '@/utils/helpers.ts';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'ghost-danger';
  size?: 'sm' | 'md' | 'lg';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  iconOnly?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
  child?: React.ReactElement<{ className?: string }>;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'md',
      startIcon,
      endIcon,
      iconOnly = false,
      isLoading = false,
      asChild = false,
      child,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const cls = cn(
      styles.btn,
      styles[variant],
      styles[size],
      iconOnly && styles.iconOnly,
      (disabled || isLoading) && styles.disabled,
      className
    );

    if (asChild && child) {
      return React.cloneElement(child, {
        className: cn(child.props.className, cls),
      });
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cls}
        {...props}
      >
        {isLoading ? (
          <span className={styles.spinner} />
        ) : (
          <>
            {startIcon && (
              <span className={cn(styles.icon, styles.start)}>{startIcon}</span>
            )}
            {!iconOnly && children}
            {endIcon && (
              <span className={cn(styles.icon, styles.end)}>{endIcon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
