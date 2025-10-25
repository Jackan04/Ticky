import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem";
import Modal from "../Modal/Modal";
import TaskDetailsContent from "../Modal/TaskDetailsContent";
import ActionConfirmContent from "../Modal/ActionConfirmContent";
import { useEffect, useState } from "react";
import { useModal } from "../../context/modalProvider";
import { FirebaseTaskService } from "../../firebase/FirebaseTaskService";
import { useList } from "../../context/listProvider";

export default function TaskList() {
  const { close, activeModal, modalData } = useModal();
  const { getActiveList, activeList, decrementTaskCount, loadAllLists } =
    useList();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!activeList) {
      setTasks([]);
      return;
    }

    const taskService = new FirebaseTaskService();

    async function load() {
      const results = await taskService.getAllTasks();
      const filtered = results.filter((item) => item.listId === activeList.id);
      setTasks(filtered || []);
    }

    load();
  }, [activeList, getActiveList]);

  async function handleDeleteTask(task) {
    if (!task?.id) return;
    const taskService = new FirebaseTaskService();
    try {
      await taskService.deleteTask(task);
      close();
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
      await decrementTaskCount();
      activeList.taskCount--;
      await loadAllLists();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  }

  if (!activeList || activeList.taskCount === 0) {
    return <p className={styles.emptyState}>No To-Dos Yet</p>;
  }

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

      <Modal
        isOpen={activeModal === "confirmDelete"}
        onClose={close}
        title="Confirm Deletion"
      >
        <ActionConfirmContent
          action="Delete"
          subText="Deleting this task will completely remove it, and you won’t be able to restore it."
          onClick={() => handleDeleteTask(modalData)}
        />
      </Modal>
    </div>
  );
}
