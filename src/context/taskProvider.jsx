import { useContext, createContext, useState, useEffect } from "react";
import { FirebaseTaskService } from "../firebase/FirebaseTaskService";
import { useModal } from "./modalProvider";
import { useList } from "./listProvider";

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [hideCompleted, sethideCompleted] = useState(false);
  const { activeList, loadAllLists, lists } = useList();
  const { close } = useModal();

  useEffect(() => {
    const load = async () => {
      await loadAllTasks();
    };
    load();
  }, [activeList]);

  async function loadAllTasks() {
    const taskService = new FirebaseTaskService();

    try {
      if (!activeList) {
        const allTasks = await taskService.getAllTasks();
        sortTasks(allTasks);

        setTasks(allTasks);
        sethideCompleted(false);
      } else {
        const resultsByList = await taskService.getTasksByList(activeList.id);
        sortTasks(resultsByList);

        setTasks(resultsByList);
        sethideCompleted(false);
      }
    } catch (error) {
      console.error("Failed to load tasks: ", error);
    }
  }

  async function sortTasks(tasks) {
    // Sort tasks by completed and dueDate
    // Tasks without a dueDate appears last in the list
    return tasks.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed - b.completed;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
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

  function getListNameById(listId) {
    const match = lists.find((list) => list.id === listId);
    return match ? match.name : "";
  }

  async function toggleCompleted(task) {
    const taskService = new FirebaseTaskService();
    await taskService.toggleTaskCompleted(task);
    await loadAllLists();
    await loadAllTasks();
  }

  async function toggleHideCompleted(listId) {
    const taskService = new FirebaseTaskService();

    const results = activeList
      ? await taskService.getTasksByList(listId)
      : await taskService.getAllTasks();

    const nextHideCompleted = !hideCompleted;

    const visibleTasks = nextHideCompleted
      ? results.filter((task) => !task.completed)
      : results;
    sortTasks(visibleTasks);
    setTasks(visibleTasks);
    sethideCompleted(nextHideCompleted);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        hideCompleted,
        loadAllTasks,
        toggleCompleted,
        toggleHideCompleted,
        handleDeleteTask,
        getListNameById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
