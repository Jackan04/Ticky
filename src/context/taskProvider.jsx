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
  const { activeList, loadAllLists, lists } = useList();
  const { close } = useModal();
  const [stats, setStats] = useState([
    { value: 0 },
    { value: 0 },
    { value: 0 },
  ]);

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
        computeStats(allTasks);
      } else {
        const resultsByList = await taskService.getTasksByList(activeList.id);
        sortTasks(resultsByList);

        setTasks(resultsByList);
        computeStats(resultsByList);
      }
    } catch (error) {
      console.error("Failed to load tasks: ", error);
    }
  }

  function sortTasks(tasks) {
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

  function computeStats(sourceTasks) {
    const allTasks = sourceTasks.length;
    const remainingTasks = sourceTasks.filter((task) => !task.completed).length;
    const completedTasks = sourceTasks.filter((task) => task.completed).length;

    setStats([
      { value: allTasks },
      { value: remainingTasks },
      { value: completedTasks },
    ]);
  }

  // keep getStats as a utility that recomputes stats from current state if needed
  function getStats() {
    computeStats(tasks);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loadAllTasks,
        toggleCompleted,
        handleDeleteTask,
        getListNameById,
        getStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
