import styles from './SwitchToggle.module.scss';

type SwitchToggleProps = {
  /** Обработчик переключения темы */
  onDarkHandler: () => void;
  /** Текущая тема */
  isDark: boolean;
  /** Размер переключателя */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительный класс */
  className?: string;
};

export const SwitchToggle = ({
  onDarkHandler,
  isDark,
  size = 'medium',
  className = '',
}: SwitchToggleProps) => {
  return (
    <div className={`${styles.flexContainer} ${className}`}>
      <label className={styles.switch} aria-label="Toggle theme">
        <input
          type="checkbox"
          checked={isDark}
          onChange={onDarkHandler}
          className={styles.input}
          aria-checked={isDark}
        />
        <span className={`${styles.slider} ${styles[`slider--${size}`]}`} />
      </label>
    </div>
  );
};
