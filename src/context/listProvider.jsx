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
      results.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
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
    setActiveList(list);
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
};
