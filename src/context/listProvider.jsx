import { useContext, createContext, useState, useEffect } from "react";
import FirebaseListService from "../firebase/FirebaseListService";

const ListContext = createContext();

export const useList = () => {
  return useContext(ListContext);
};

export const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState(null);

  async function loadAllLists() {
    const listService = new FirebaseListService();

    try {
      const results = await listService.getAllLists();
      results.sort((a, b) => (a.name || "").localeCompare(b.name || "")); // Sort lists by name
      setLists(results);

      if (!activeList && results.length) {
        setActiveList(results[0]);
      }
    } catch (error) {
      console.error("Failed to load lists: ", error);
    }
  }

  useEffect(() => {
    const load = async () => {
      await loadAllLists();
    };
    load();
  }, []);

  function toggleActiveList(list) {
    setActiveList(list || lists[0]);
  }

  function getActiveList() {
    return activeList;
  }

  async function incrementTaskCount() {
    const listService = new FirebaseListService();
    await listService.updateTaskCount(activeList.id, 1);
    activeList.taskCount++;
  }

  async function decrementTaskCount() {
    const listService = new FirebaseListService();
    await listService.updateTaskCount(activeList.id, -1);
    activeList.taskCount--;
  }

  return (
    <ListContext.Provider
      value={{
        toggleActiveList,
        getActiveList,
        loadAllLists,
        incrementTaskCount,
        decrementTaskCount,
        activeList,
        lists,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
