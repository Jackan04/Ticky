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
  const { activeList, loadAllLists } = useList();
  const [inputTitle, setInputTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [list, setList] = useState("");
  const [notes, setNotes] = useState("");

  function handleInputChange(event) {
    setInputTitle(event.target.value); // If isn't using detailed view for adding a new task
  }

  async function handleAddTask() {
    const taskService = new FirebaseTaskService();
    if (!inputTitle.trim()) return;

    const newTask = {
      // listId: activeList.id ?? list.id,
      listId:
        activeList && activeList.id
          ? activeList.id
          : list && list.id
          ? list.id
          : null,
      title: inputTitle.trim(),
      completed: false,
      dueDate: dueDate || null,
      notes: notes || "",
    };

    try {
      await taskService.addTask(newTask);
    } catch (error) {
      console.error("Failed to add task", error);
    }

    loadAllLists();
    setInputTitle("");
    setDueDate(null);
    setNotes("");
    close();
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
        onClick={handleAddTask}
        isOpen={activeModal === "newTask"}
        onClose={close}
        title="New To-Do"
        buttonText="Save"
      >
        <NewTaskContent
          title={inputTitle}
          onTitleChange={(value) => setInputTitle(value)}
          dueDate={dueDate}
          onDueDateChange={(value) => setDueDate(value)}
          list={list}
          onListChange={(value) => setList(value)}
          notes={notes}
          onNotesChange={(value) => setNotes(value)}
        />
      </Modal>
    </div>
  );
}
