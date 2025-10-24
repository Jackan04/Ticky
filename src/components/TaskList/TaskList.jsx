import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem";
import Modal from "../Modal/Modal";
import TaskDetailsContent from "../Modal/TaskDetailsContent";
import { useEffect, useState } from "react";
import { useModal } from "../../context/modalProvider";
import { FirebaseTaskService } from "../../firebase/FirebaseTaskService";
import { useList } from "../../context/listProvider";

export default function TaskList() {
  const { close, activeModal, modalData } = useModal();
  const { getActiveList } = useList();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const taskService = new FirebaseTaskService();
    const list = getActiveList();

    async function load() {
      const results = await taskService.getAllTasks();
      // const filtered = results.filter(item => item.listId === list.id);
      setTasks(results);
    }
    load();
  }, []);

  return (
    <div>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>

      {/* Single modal for all task details */}
      <Modal
        isOpen={activeModal === "taskDetails"}
        onClose={close}
        title="Task Details"
        buttonText="Edit"
      >
        {modalData && <TaskDetailsContent task={modalData} />}
      </Modal>
    </div>
  );
}
