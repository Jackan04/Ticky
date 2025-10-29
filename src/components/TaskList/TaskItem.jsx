import styles from "./TaskList.module.css";
import CheckBoxIcon from "../../assets/icons/check-box.svg?react";
import EllipsisIcon from "../../assets/icons/ellipsis.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import NotesIcon from "../../assets/icons/note.svg?react";
import CalendarIcon from "../../assets/icons/calendar.svg?react";
import Button from "../Button/Button";
import { useModal } from "../../context/modalProvider.jsx";

export default function TaskItem({ task, onClick, listName }) {
  const { open } = useModal();

  function handleOpenDetails() {
    open("taskDetails", task);
  }

  function handleOpenDelete() {
    open("confirmDeleteTask", task);
  }

  return (
    <li className={styles.task}>
      <div className={styles.controlsLeft}>
        <Button
          icon={
            <CheckBoxIcon
              className={`icon ${styles.iconCheckBox} ${
                task.completed ? styles.completed : ""
              }`}
            />
          }
          variant="transparent"
          onClick={onClick}
        />
        <div className={`subText ${styles.textContainer}`}>
          <span
            className={`body ${styles.text} ${
              task.completed ? styles.completed : ""
            }`}
          >
            {task.title}
          </span>
          <span className={styles.metaInfo}>
            {listName}
            {task.notes ? (
              <NotesIcon className={`icon ${styles.iconIndicator}`} />
            ) : (
              ""
            )}
            {task.dueDate ? (
              <CalendarIcon className={`icon ${styles.iconIndicator}`} />
            ) : (
              ""
            )}
          </span>
        </div>
      </div>

      <div className={`${styles.controlsRight} ${styles.hide}`}>
        <Button
          text={<EllipsisIcon className={`icon ${styles.iconEllipsis} `} />}
          variant="transparent"
          onClick={handleOpenDetails}
        />
        <Button
          text={<TrashIcon className={`icon ${styles.iconTrash} `} />}
          variant="transparent"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenDelete(task);
          }}
        />
      </div>
    </li>
  );
}
