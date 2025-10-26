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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    if (modalData) {
      setIsEditing(false);
      setEditedTask(modalData);
    }
  }, [modalData]);

  useEffect(() => {
    const taskService = new FirebaseTaskService();

    async function loadAllTasks() {
      const allTasks = await taskService.getAllTasks();
      setTasks(allTasks);
    }

    async function load() {
      const resultsByList = await taskService.getTasksByList(activeList.id);
      setTasks(resultsByList || []);
    }

    if (!activeList) {
      loadAllTasks();
    } else {
      load();
    }
  }, [activeList]);

  async function handleDeleteTask(task) {
    if (!task?.id) return;
    const taskService = new FirebaseTaskService();
    try {
      await taskService.deleteTask(task);
      close();
      await decrementTaskCount();
      await loadAllLists();
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  }

  async function handleUpdateTask() {
    const taskService = new FirebaseTaskService();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    await taskService.updateTask(editedTask);
    setIsEditing(false);
    loadAllLists();
    close();
  }

  async function toggleCompleted(task) {
    const taskService = new FirebaseTaskService();
    await taskService.toggleTaskCompleted(task);
    loadAllLists();
  }

  if (
    (activeList && activeList.taskCount === 0) ||
    (!activeList && tasks.length === 0)
  ) {
    return <p className={styles.emptyState}>No To-Dos Yet</p>;
  }

  return (
    <div>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onClick={() => toggleCompleted(task)}
          />
        ))}
      </ul>

      {/* Single modal for all task details */}
      <Modal
        isOpen={activeModal === "taskDetails"}
        onClose={close}
        title={isEditing ? "Edit Task" : "Task Details"}
        buttonText={isEditing ? "Save" : "Edit"}
        onClick={handleUpdateTask}
      >
        {modalData && (
          <TaskDetailsContent
            task={editedTask}
            isEditing={isEditing}
            onChange={setEditedTask}
          />
        )}
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
