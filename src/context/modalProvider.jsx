import { useState, createContext, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  const open = (name) => setActiveModal(name);

  const close = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ open, close, activeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
