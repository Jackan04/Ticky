import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem";
import Modal from "../Modal/Modal";
import TaskDetailsContent from "../Modal/TaskDetailsContent";
import ActionConfirmContent from "../Modal/ActionConfirmContent";
import { useEffect, useState } from "react";
import { useModal } from "../../context/modalProvider";
import { FirebaseTaskService } from "../../firebase/FirebaseTaskService";
import { useList } from "../../context/listProvider";
import { useTask } from "../../context/taskProvider";

export default function TaskList() {
  const { close, activeModal, modalData } = useModal();
  const { activeList, loadAllLists, lists } = useList();
  const { tasks, loadAllTasks } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    // When activeList changes, ask the TaskProvider to reload tasks.
    loadAllTasks();
  }, [activeList]);

  useEffect(() => {
    if (modalData) {
      setIsEditing(false);
      setEditedTask(modalData);
    }
  }, [modalData]);

  function getListNameById(listId) {
    const match = lists.find((list) => list.id === listId);
    return match ? match.name : "";
  }

  // TaskProvider now owns loading tasks; TaskList consumes `tasks` from that provider.

  async function handleDeleteTask(task) {
    if (!task?.id) return;
    const taskService = new FirebaseTaskService();
    try {
      await taskService.deleteTask(task);
      await loadAllLists();
      await loadAllTasks();
      close();
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
    await loadAllLists();
    await loadAllTasks();
    close();
  }

  async function toggleCompleted(task) {
    const taskService = new FirebaseTaskService();
    await taskService.toggleTaskCompleted(task);
    await loadAllLists();
    await loadAllTasks();
  }

  if (!tasks || tasks.length === 0) {
    return <p className={styles.emptyState}>No To-Dos Yet</p>;
  }

  return (
    <div>
      <ul className={styles.list}>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            listName={getListNameById(task.listId)}
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
