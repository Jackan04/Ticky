import CalendarIcon from "../../assets/icons/calendar.svg?react";
import CheckBoxIcon from "../../assets/icons/check-box.svg?react";
import NoteIcon from "../../assets/icons/note.svg?react";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

export default function TaskDetailsContent({ task, isEditing, onChange }) {
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
              value={task.dueDate || "No due date"}
              onChange={(e) => onChange({ ...task, dueDate: e.target.value })}
            ></input>
          </div>
          <div className={styles.inputGroup}>
            <NoteIcon className="icon" />
            <textarea
              type="date"
              disabled={!isEditing}
              className={styles.notes}
              value={task.notes || "No notes"}
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
