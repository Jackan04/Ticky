import { useContext, createContext, useState, act } from "react";

const ListContext = createContext();

export const useList = () => {
  return useContext(ListContext);
};

export const ListProvider = ({ children }) => {
  const [activeList, setActiveList] = useState(null);



  const toggleActiveList = (list) => {
    setActiveList(list);
  };

  const getActiveList = () => {
    return activeList;
  };

  return (
    <ListContext.Provider
      value={{ toggleActiveList, getActiveList, activeList }}
    >
      {children}
    </ListContext.Provider>
  );
};
