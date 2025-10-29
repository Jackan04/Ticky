import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem";
import Modal from "../Modal/Modal";
import TaskDetailsContent from "../Modal/TaskDetailsContent";
import ActionModal from "../Modal/ActionModal";
import { useEffect, useState } from "react";
import { useModal } from "../../context/modalProvider";
import { FirebaseTaskService } from "../../firebase/FirebaseTaskService";
import { useList } from "../../context/listProvider";
import { useTask } from "../../context/taskProvider";
import StatsCard from "../StatsCard/StatsCard";

export default function TaskList() {
  const { close, activeModal, modalData } = useModal();
  const { activeList, loadAllLists } = useList();
  const {
    tasks,
    loadAllTasks,
    toggleCompleted,
    handleDeleteTask,
    getListNameById,
    stats,
  } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  useEffect(() => {
    loadAllTasks();
  }, [activeList]);

  useEffect(() => {
    if (modalData) {
      setIsEditing(false);
      setEditedTask(modalData);
    }
  }, [modalData]);

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
        <p className={styles.emptyStateText}>No To-Dos to display</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
        <div className={styles.stats}>
          <StatsCard
            color="blue"
            value={stats[0].value}
            label="All"
          ></StatsCard>
          <StatsCard
            color="red"
            value={stats[1].value}
            label="Remaining"
          ></StatsCard>
          <StatsCard
            color="green"
            value={stats[2].value}
            label="Completed"
          ></StatsCard>
        </div>
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

      <ActionModal
        isOpen={activeModal === "confirmDeleteTask"}
        onClose={close}
        title="Confirm Deletion"
        action="Delete"
        subText={
          "Deleting this task will completely remove it, and you won’t be able to restore it."
        }
        onConfirm={() => handleDeleteTask(modalData)}
      />
    </div>
  );
}
