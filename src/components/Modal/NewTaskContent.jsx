import styles from "./Modal.module.css";

// Controlled form for creating a new task. Parent should pass values and
// change handlers so the same data is available when the Modal's action
// button is clicked (the Modal component renders the button).
export default function NewTaskContent({
  title,
  onTitleChange,
  dueDate,
  onDueDateChange,
  notes,
  onNotesChange,
}) {
  return (
    <div className={styles.newTaskContent}>
      <input
        type="text"
        placeholder="New To-Do"
        autoFocus
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <input
        type="date"
        value={dueDate || ""}
        onChange={(e) => onDueDateChange(e.target.value)}
      />
      <textarea
        className={styles.notes}
        name="task-notes"
        id="task-notes"
        placeholder="Notes"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
      />
    </div>
  );
}
