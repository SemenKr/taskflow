import styles from './switchToggle.module.scss';

export const SwitchToggle = () => {
  return (
    <div className={styles.flexContainer}>
      <label className={styles.switch}>
        <input type={styles.checkbox} />
        <span className={styles.slider} />
      </label>
    </div>
  );
};
