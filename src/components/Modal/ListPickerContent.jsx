import styles from "./Modal.module.css";
import ListIcon from "../../assets/icons/list.svg?react";
import EllipsisIcon from "../../assets/icons/ellipsis.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import InboxIcon from "../../assets/icons/inbox.svg?react";
import Button from "../Button/Button";
import { useList } from "../../context/listProvider.jsx";
import { useModal } from "../../context/modalProvider.jsx";
import FirebaseListService from "../../firebase/FirebaseListService.js";
import ActionModal from "./ActionModal.jsx";

export default function ListPicker() {
  const { toggleActiveList, lists, loadAllLists } = useList();
  const { open, close, activeModal, modalData } = useModal();

  function handleClick(list) {
    toggleActiveList(list);
    close();
  }

  function handleOpenDelete(list) {
    open("confirmDeleteList", list);
  }

  return (
    <div className={styles.listPickerContainer}>
      <div className={styles.lists}>
        <p className="subText">Views</p>
        <ul className={styles.listPicker}>
          <li className={styles.list} onClick={() => handleClick()}>
            <div className={styles.controlsLeft}>
              <InboxIcon className={`icon ${styles.iconInbox}`} />
              <p>All To-Dos</p>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.lists}>
        <p className="subText">My Lists</p>
        <ul className={styles.listPicker}>
          {lists.map((list) => (
            <li
              className={styles.list}
              key={list.id}
              onClick={() => handleClick(list)}
            >
              <div className={styles.controlsLeft}>
                <ListIcon className={`icon ${styles.iconList}`} />
                {list.name}
              </div>

              <div className={`${styles.controlsRight} ${styles.hide}`}>
                <Button
                  text={
                    <EllipsisIcon className={`icon ${styles.iconEllipsis} `} />
                  }
                  variant="transparent"
                />
                <Button
                  text={<TrashIcon className={`icon ${styles.iconTrash} `} />}
                  variant="transparent"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenDelete(list);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Confirmation modal for deleting a list is rendered at the (Header) to avoid nested stacking issues */}
    </div>
  );
}
