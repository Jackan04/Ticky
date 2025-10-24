import styles from "./Modal.module.css";

export default function NewTaskContent({ inputTitle }) {
  return (
    <div className={styles.newTaskContent}>
      <input
        type="text"
        placeholder="New To-Do"
        autoFocus
        value={inputTitle}
      ></input>
      <input type="date"></input>
      <textarea
        className={styles.notes}
        name="task-notes"
        id="task-notes"
        placeholder="Notes"
      ></textarea>
    </div>
  );
}
