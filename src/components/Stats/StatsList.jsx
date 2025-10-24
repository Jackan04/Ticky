import styles from "./Stats.module.css";
import StatCard from "./StatCard";

export default function StatsList() {
  return (
    <div className={styles.stats}>
      <StatCard type="all" count="12" title="All" />
      <StatCard type="remaining" count="7" title="Remaining" />
      <StatCard type="completed" count="4" title="Completed" />
    </div>
  );
}
