import { useState, createContext, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const open = (name, data = null) => {
    setActiveModal(name);
    setModalData(data);
  };

  const close = () => {
    setActiveModal(null);
    setModalData(null);
  };

  return (
    <ModalContext.Provider value={{ open, close, activeModal, modalData }}>
      {children}
    </ModalContext.Provider>
  );
};
