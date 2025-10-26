import styles from "./Modal.module.css";
import FirebaseListService from "../../firebase/FirebaseListService";
import { useEffect, useState } from "react";

// Controlled form for creating a new task. Parent should pass values and
// change handlers so the same data is available when the Modal's action
// button is clicked (the Modal component renders the button).
export default function NewTaskContent({
  title,
  onTitleChange,
  dueDate,
  onDueDateChange,
  list,
  onListChange,
  notes,
  onNotesChange,
}) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    loadLists();
  }, []);

  async function loadLists() {
    const listService = new FirebaseListService();
    const results = await listService.getAllLists();
    setLists(results);
  }

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
      <select
        value={list?.id || ""}
        onChange={(e) => {
          const selectedId = e.target.value;
          const selected = lists.find((l) => l.id === selectedId) || null;
          onListChange(selected);
        }}
      >
        <option value="" disabled>
          Choose a List
        </option>
        {lists.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>
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
