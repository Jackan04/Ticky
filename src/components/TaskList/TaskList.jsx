import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem";
import Modal from "../Modal/Modal";
import TaskDetailsContent from "../Modal/TaskDetailsContent";
import { useEffect, useState } from "react";
import { useModal } from "../../context/modalProvider";
import { FirebaseTaskService } from "../../firebase/FirebaseTaskService";

// TODO: Pass active list (global context) as a prop to display the correct task list
export default function TaskList() {
  const { close, activeModal, modalData } = useModal();

  return (
    <div>
      <ul className={styles.list}>
        <TaskItem
          title="Take out trash"
          completed={false}
          dueDate="Oct 24, 2025"
          notes="deserunt magna consequat duis culpa amet eiusmod irure sint cupidatat minim occaecat amet dolor culpa aliquip esse laboris velit ad"
        ></TaskItem>
        <TaskItem
          title="Call mom"
          completed={false}
          dueDate="Oct 28, 2025"
          notes="deserunt magna consequat duis culpa amet eiusmod irure sint cupidatat minim occaecat amet dolor culpa aliquip esse laboris velit ad"
        ></TaskItem>
        <TaskItem
          title="Study for exam"
          completed={false}
          dueDate="Oct 24, 2025"
          notes="deserunt magna consequat duis culpa amet eiusmod irure sint cupidatat minim occaecat amet dolor culpa aliquip esse laboris velit ad"
        ></TaskItem>
        <TaskItem
          title="Study for exam"
          completed={true}
          dueDate="Oct 24, 2025"
          notes="deserunt magna consequat duis culpa amet eiusmod irure sint cupidatat minim occaecat amet dolor culpa aliquip esse laboris velit ad"
        ></TaskItem>
      </ul>

      {/* Single modal for all task details */}
      <Modal
        isOpen={activeModal === "taskDetails"}
        onClose={close}
        title="Task Details"
        buttonText="Edit"
      >
        {modalData && (
          <TaskDetailsContent
            title={modalData.title}
            dueDate={modalData.dueDate}
            notes={modalData.notes}
          />
        )}
      </Modal>
    </div>
  );
}
