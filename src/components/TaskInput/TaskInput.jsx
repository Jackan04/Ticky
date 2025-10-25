import styles from "./TaskInput.module.css";
import PlusIcon from "../../assets/icons/plus.svg?react";
import DropdownIcon from "../../assets/icons/drop-down.svg?react";
import Button from "../Button/Button";
import { useState } from "react";
import Modal from "../Modal/Modal";
import NewTaskContent from "../Modal/NewTaskContent.jsx";
import { useModal } from "../../context/modalProvider.jsx";
import { useList } from "../../context/listProvider.jsx";
import { FirebaseTaskService } from "../../firebase/FirebaseTaskService.js";

export default function TaskInput() {
  const { open, close, activeModal } = useModal();
  const { activeList, loadAllLists, incrementTaskCount } = useList();
  const [inputTitle, setInputTitle] = useState("");

  function handleInputChange(event) {
    setInputTitle(event.target.value);
  }

  async function handleAddTask() {
    const taskService = new FirebaseTaskService();
    if (!inputTitle.trim()) return;

    const newTask = {
      listId: activeList.id,
      title: inputTitle.trim(),
      completed: false,
      dueDate: null,
      notes: "",
    };

    try {
      await taskService.addTask(newTask);
    } catch (error) {
      console.error("Failed to add task", error);
    }

    loadAllLists();
    setInputTitle("");
    await incrementTaskCount(); // firebaseListService => listProvider => TaskInput
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
          onClick={handleAddTask}
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
