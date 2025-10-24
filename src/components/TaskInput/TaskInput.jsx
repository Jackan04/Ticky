import styles from "./TaskInput.module.css";
import PlusIcon from "../../assets/icons/plus.svg?react";
import DropdownIcon from "../../assets/icons/drop-down.svg?react";
import Button from "../Button/Button";
import { useState } from "react";
import Modal from "../Modal/Modal";
import NewTaskContent from "../Modal/NewTaskContent.jsx";
import { useModal } from "../../context/modalProvider.jsx";

export default function TaskInput() {
  const { open, close, activeModal } = useModal();
  const [inputTitle, setInputTitle] = useState("");

  function handleInputChange(event) {
    setInputTitle(event.target.value);
    console.log(inputTitle);
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="New To-Do"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={inputTitle}
        onChange={handleInputChange}
      />
      <div className={styles.controls}>
        <Button
          text={<DropdownIcon className={`icon ${styles.iconDropDown} `} />}
          variant="transparent"
          onClick={() => open("newTask")}
        ></Button>
        <Button
          className={styles.btnAdd}
          text={<PlusIcon className={`icon ${styles.iconPlus}`} />}
          variant="default"
        ></Button>
      </div>

      <Modal
        isOpen={activeModal === "newTask"}
        onClose={close}
        title="New To-Do"
        buttonText="Save"
      >
        <NewTaskContent inputTitle={inputTitle}></NewTaskContent>
      </Modal>
    </div>
  );
}
