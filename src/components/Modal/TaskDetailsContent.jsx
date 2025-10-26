import CalendarIcon from "../../assets/icons/calendar.svg?react";
import CheckBoxIcon from "../../assets/icons/check-box.svg?react";
import NoteIcon from "../../assets/icons/note.svg?react";
import ListIcon from "../../assets/icons/list.svg?react";
import { useState, useEffect } from "react";
import FirebaseListService from "../../firebase/FirebaseListService";
import styles from "./Modal.module.css";

export default function TaskDetailsContent({ task, isEditing, onChange }) {
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
    <div className={styles.taskDetailsContent}>
      {task && (
        <>
          <div className={styles.inputGroup}>
            <CheckBoxIcon className="icon" />
            <input
              type="text"
              disabled={!isEditing}
              className={styles.taskTitle}
              value={task.title}
              onChange={(e) => onChange({ ...task, title: e.target.value })}
            ></input>
          </div>
          <div className={styles.inputGroup}>
            <CalendarIcon className="icon" />
            <input
              type="date"
              disabled={!isEditing}
              className={styles.dueDate}
              value={task.dueDate}
              onChange={(e) => onChange({ ...task, dueDate: e.target.value })}
            ></input>
          </div>
          <div className={styles.inputGroup}>
            <ListIcon className="icon" />
            <select
              disabled={!isEditing}
              value={task.listId || ""}
              onChange={(e) => {
                onChange({
                  ...task,
                  listId: e.target.value,
                });
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
          </div>
          <div className={styles.inputGroup}>
            <NoteIcon className="icon" />
            <textarea
              type="date"
              disabled={!isEditing}
              className={styles.notes}
              value={task.notes || ""}
              placeholder={task.notes || "No notes"}
              onChange={(e) => onChange({ ...task, notes: e.target.value })}
            ></textarea>
          </div>
        </>
      )}
    </div>

    // <div className={styles.taskDetailsContent}>
    //   <div className={styles.taskTitle}>
    //     <Button
    //       variant="transparent"
    //       icon={<CheckBoxIcon className="icon" />}
    //     ></Button>
    //     <h2>{task.title}</h2>
    //   </div>
    //   <div className={styles.dueDate}>
    //     <CalendarIcon className="icon" />
    //     <p>{task.dueDate || "No due date"}</p>
    //   </div>
    //   <div className={styles.notes}>
    //     <p>{task.notes || "No notes"}</p>
    //   </div>
    // </div>
  );
}
