import { useContext, createContext, useState, useEffect } from "react";
import { FirebaseTaskService } from "../firebase/FirebaseTaskService";
import { useList } from "./listProvider";

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [hideCompleted, sethideCompleted] = useState(false);
  const { activeList, loadAllLists } = useList();

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
        setTasks(allTasks);
      } else {
        const resultsByList = await taskService.getTasksByList(activeList.id);
        setTasks(resultsByList || []);
      }
    } catch (error) {
      console.error("Failed to load tasks: ", error);
    }
  }

  async function toggleCompleted(task) {
    const taskService = new FirebaseTaskService();
    await taskService.toggleTaskCompleted(task);
    await loadAllLists();
    await loadAllTasks();
  }

  //   async function hideCompleted(listId) {
  //     const taskService = new FirebaseTaskService();
  //     if (!activeList) {
  //       const allTasks = await taskService.getAllTasks();
  //       const notCompleted = allTasks.filter((task) => task.completed !== true);
  //       setTasks(notCompleted);
  //     } else {
  //       const allTasks = await taskService.getTasksByList(listId);
  //       const notCompleted = allTasks.filter((task) => task.completed !== true);
  //       setTasks(notCompleted);
  //     }
  //   }
  async function toggleHideCompleted(listId) {
    const taskService = new FirebaseTaskService();
    if (!hideCompleted) {
      if (!activeList) {
        const results = await taskService.getAllTasks();
        const notCompleted = results.filter((task) => task.completed !== true);
        setTasks(notCompleted);
        sethideCompleted(true)
      } else {
        const results = await taskService.getTasksByList(listId);
        const notCompleted = results.filter((task) => task.completed !== true);
        setTasks(notCompleted);
        sethideCompleted(true);
      }
    } else {
      if (!activeList) {
        const results = await taskService.getAllTasks();
        setTasks(results);
        sethideCompleted(false);
      } else {
        const results = await taskService.getTasksByList(listId);
        setTasks(results);
        sethideCompleted(false);
      }
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        hideCompleted,
        loadAllTasks,
        toggleCompleted,
        toggleHideCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
