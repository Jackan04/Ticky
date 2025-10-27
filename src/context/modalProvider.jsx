import { useState, createContext, useContext } from "react";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  function open(name, data = null) {
    setActiveModal(name);
    setModalData(data);
  }

  function close() {
    setActiveModal(null);
    setModalData(null);
  }

  return (
    <ModalContext.Provider value={{ open, close, activeModal, modalData }}>
      {children}
    </ModalContext.Provider>
  );
}
