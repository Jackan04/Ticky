import { useContext, createContext, useState, useEffect } from "react";
import FirebaseListService from "../firebase/FirebaseListService";

const ListContext = createContext();

export function useList() {
  return useContext(ListContext);
}

export function ListProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState(null);

  async function loadAllLists() {
    const listService = new FirebaseListService();

    try {
      const results = await listService.getAllLists();
      results.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
      setLists(results);

      if (!activeList) {
        setActiveList(null); // If no list is active, show all tasks in the taskList component
        return;
      }
      // If a list is active (on reload for example), show all tasks within that list
      const updatedActive = results.find((list) => list.id === activeList.id);

      if (updatedActive) {
        setActiveList(updatedActive);
      } else {
        // if the active list was deleted, fallback to view for all tasks in task list component
        setActiveList(null);
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
    setActiveList(list || null);
  }

  function getActiveList() {
    return activeList;
  }

  return (
    <ListContext.Provider
      value={{
        toggleActiveList,
        getActiveList,
        loadAllLists,
        activeList,
        lists,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}
