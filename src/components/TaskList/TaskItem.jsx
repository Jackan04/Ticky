import styles from "./TaskList.module.css";
import CheckBoxIcon from "../../assets/icons/check-box.svg?react";
import EllipsisIcon from "../../assets/icons/ellipsis.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import TaskDetailsContent from "../Modal/TaskDetailsContent";
import { useModal } from "../../context/modalProvider.jsx";
import { formatDate } from "../../../helpers.js";

export default function TaskItem({ task }) {
  const { open } = useModal();

  const handleOpenDetails = () => {
    const payload = { ...task, dueDate: formatDate(task?.dueDate) };
    open("taskDetails", payload);
  };

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
        />
        <span
          className={`body ${styles.text} ${
            task.completed ? styles.completed : ""
          }`}
        >
          {task.title}
        </span>
      </div>

      <div className={styles.controlsRight}>
        <Button
          text={<EllipsisIcon className={`icon ${styles.iconEllipsis} `} />}
          variant="transparent"
          onClick={handleOpenDetails}
        />
        <Button
          text={<TrashIcon className={`icon ${styles.iconTrash} `} />}
          variant="transparent"
        />
      </div>
    </li>
  );
}
