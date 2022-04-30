import styles from '../styles/loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div></div><div></div><div></div>
    </div>
  );
}