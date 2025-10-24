import styles from "./TaskList.module.css";
import CheckBoxIcon from "../../assets/icons/check-box.svg?react";
import EllipsisIcon from "../../assets/icons/ellipsis.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import TaskDetailsContent from "../Modal/TaskDetailsContent";
import { useModal } from "../../context/modalProvider.jsx";

export default function TaskItem(props) {
  const { open, close, activeModal } = useModal();
  return (
    <li className={styles.task}>
      <div className={styles.controlsLeft}>
        <Button
          icon={
            <CheckBoxIcon
              className={`icon ${styles.iconCheckBox} ${
                props.completed ? styles.completed : ""
              }`}
            />
          }
          variant="transparent"
        />
        <span
          className={`body ${styles.text} ${
            props.completed ? styles.completed : ""
          }`}
        >
          {props.text}
        </span>
      </div>

      <div className={styles.controlsRight}>
        <Button
          text={<EllipsisIcon className={`icon ${styles.iconEllipsis} `} />}
          variant="transparent"
          onClick={() => open("taskDetails")}
        />
        <Button
          text={<TrashIcon className={`icon ${styles.iconTrash} `} />}
          variant="transparent"
        />

        <Modal
          isOpen={activeModal === "taskDetails"}
          onClose={close}
          title="Task Details"
          buttonText="Edit"
        >
          <TaskDetailsContent
            title="Take out trash"
            dueDate="Oct 23, 2025"
            notes="nostrud esse laborum aute minim culpa id occaecat velit elit cillum qui qui aliquip Lorem consequat duis ea irure adipisicing in aute esse qui cupidatat nostrud nulla Lorem ad Lorem"
          />
        </Modal>
      </div>
    </li>
  );
}
