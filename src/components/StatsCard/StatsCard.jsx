import styles from "./StatsCard.module.css";
export default function StatsCard({ label, value, color }) {
  return (
      <div className={styles.card}>
        <span className={`${styles.number} ${styles[color]}`}>{value}</span>
        <span className={styles.text}>{label}</span>
      </div>
  );
}
