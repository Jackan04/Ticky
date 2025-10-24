import CalendarIcon from "../../assets/icons/calendar.svg?react";
import CheckBoxIcon from "../../assets/icons/check-box.svg?react";
import Button from "../Button/Button";
import styles from "./Modal.module.css";

export default function TaskDetailsContent({ task }) {
  return (
    <div className={styles.taskDetailsContent}>
      <div className={styles.taskTitle}>
        <Button
          variant="transparent"
          icon={<CheckBoxIcon className="icon" />}
        ></Button>
        <h2>{task.title}</h2>
      </div>
      <div className={styles.dueDate}>
        <CalendarIcon className="icon" />
        <p>{task.dueDate}</p>
      </div>
      <div className={styles.notes}>
        <p>{task.notes}</p>
      </div>
    </div>
  );
}
