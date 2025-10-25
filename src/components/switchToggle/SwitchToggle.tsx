import styles from './switchToggle.module.scss';

type SwitchToggleProps = {
  onDarkHandler: () => void;
};

export const SwitchToggle = ({ onDarkHandler }: SwitchToggleProps) => {
  return (
    <div className={styles.flexContainer}>
      <label className={styles.switch}>
        <input type={'checkbox'} onChange={onDarkHandler} />
        <span className={styles.slider} />
      </label>
    </div>
  );
};
