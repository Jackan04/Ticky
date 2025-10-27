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
import Button from "../Button/Button";

export default function TaskList() {
  const { close, activeModal, modalData } = useModal();
  const { activeList, loadAllLists, lists } = useList();
  const {
    tasks,
    loadAllTasks,
    toggleCompleted,
    toggleHideCompleted,
    hideCompleted,
  } = useTask();
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

  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyStateText}>No To-Dos Yet</p>
        <Button
          variant="transparent"
          text={hideCompleted ? "Show Completed" : "Hide Completed"}
          onClick={
            activeList
              ? () => toggleHideCompleted(activeList.id)
              : () => toggleHideCompleted()
          }
        ></Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
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

      <Button
        className={styles.btnHideCompleted}
        variant="transparent"
        text={hideCompleted ? "Show Completed" : "Hide Completed"}
        onClick={
          activeList
            ? () => toggleHideCompleted(activeList.id)
            : () => toggleHideCompleted()
        }
      ></Button>

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
