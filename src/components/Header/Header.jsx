import styles from "./Header.module.css";
import ListIcon from "../../assets/icons/list.svg?react";
import LightbulbIcon from "../../assets/icons/lightbulb.svg?react";
import LightbulbFilledIcon from "../../assets/icons/lightbulb-full.svg?react";
import InboxIcon from "../../assets/icons/inbox.svg?react";
import PlusIcon from "../../assets/icons/plus.svg?react";
import { useTheme } from "../../context/themeProvider";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ListPickerContent from "../Modal/ListPickerContent.jsx";
import ActionModal from "../Modal/ActionModal.jsx";
import NewListContent from "../Modal/NewListContent";
import { useModal } from "../../context/modalProvider.jsx";
import { useList } from "../../context/listProvider.jsx";
import FirebaseListService from "../../firebase/FirebaseListService.js";
import { useState } from "react";

export default function Header() {
  const { toggleTheme, theme } = useTheme();
  const { open, close, activeModal, modalData, setModalData } = useModal();
  const { activeList, loadAllLists } = useList();
  const [newList, setNewList] = useState({ name: "" });

  async function handleNewList() {
    const listService = new FirebaseListService();
    await listService.addList(newList);
    setNewList({ name: "" });
    close();
    loadAllLists();
  }

  async function handleUpdateList() {
    const listService = new FirebaseListService();
    await listService.updateList(modalData);
    setNewList({ name: "" });
    close();
    loadAllLists();
  }

  async function handleDeleteList(list) {
    const listService = new FirebaseListService();
    await listService.deleteList(list);
    close();
    await loadAllLists();
  }

  return (
    <div className={styles.container}>
      <Button
        className={styles.listButton}
        variant="transparent"
        text={activeList?.name ?? "All To-Dos"}
        icon={
          activeList ? (
            <ListIcon className={`icon ${styles.iconList}`} />
          ) : (
            <InboxIcon className={`icon ${styles.iconInbox}`} />
          )
        }
        onClick={() => open("listPicker")}
      ></Button>
      <div className={styles.controls}>
        <Button
          onClick={toggleTheme}
          variant="transparent"
          icon={
            theme === "light" ? (
              <LightbulbFilledIcon
                className={`icon ${styles.lightbulbFilled}`}
              />
            ) : (
              <LightbulbIcon className={`icon ${styles.lightbulb}`} />
            )
          }
        ></Button>
        <Button
          className={styles.btnAdd}
          text="List"
          icon={<PlusIcon className={`icon ${styles.iconPlus}`} />}
          variant="default"
          onClick={() => open("newList")}
        ></Button>
      </div>
      {/* Modals */}

      <Modal
        isOpen={activeModal === "listPicker"}
        onClose={close}
        title="Lists"
      >
        <ListPickerContent />
      </Modal>

      <ActionModal
        isOpen={activeModal === "confirmDeleteList"}
        onClose={close}
        title="Confirm Deletion"
        action="Delete"
        subText={
          "Deleting this list will remove it permanently. To-Dos within the list will not be deleted."
        }
        onConfirm={() => handleDeleteList(modalData)}
      />

      <Modal
        isOpen={activeModal === "newList"}
        onClose={close}
        title="New List"
        buttonText="Save"
        onClick={() => handleNewList(newList)}
      >
        <NewListContent
          onChange={(value) => setNewList(value)}
        ></NewListContent>
      </Modal>

      <Modal
        isOpen={activeModal === "updateList"}
        onClose={close}
        title="Update List"
        buttonText="Save"
        onClick={() => handleUpdateList(modalData)}
      >
        <NewListContent
          name={modalData?.name || ""}
          onChange={(value) => setModalData((prev) => ({ ...prev, ...value }))}
        ></NewListContent>
      </Modal>
    </div>
  );
}
