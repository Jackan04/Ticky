import { useContext, createContext, useState, useEffect } from "react";
import { FirebaseTaskService } from "../firebase/FirebaseTaskService";
import { useList } from "./listProvider";

const TaskContext = createContext();

export function useTask() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState(false);
  const { activeList } = useList();

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

  useEffect(() => {
    const load = async () => {
      await loadAllTasks();
    };
    load();
  }, [activeList]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadAllTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
