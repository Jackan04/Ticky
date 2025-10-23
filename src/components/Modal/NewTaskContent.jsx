import styles from "./Modal.module.css";

export default function NewTaskContent() {
  return (
    <div className={styles.newTaskContent}>
      <input type="text" placeholder="New To-Do"></input>
      <input type="date"></input>
      <textarea
        className={styles.notes}
        name="task-title"
        id="task-notes"
        placeholder="Notes"
      ></textarea>
    </div>
  );
}
