import styles from "./Stats.module.css";

export default function StatCard({ type, count, title }) {
  return (
    <div className={styles.card}>
      <span className={`${styles.count} ${styles[type]}`}>{count}</span>
      <span className={styles.title}>{title}</span>
    </div>
  );
}
