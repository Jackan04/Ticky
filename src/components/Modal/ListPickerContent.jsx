import styles from "./Modal.module.css";
import ListIcon from "../../assets/icons/list.svg?react";
import EllipsisIcon from "../../assets/icons/ellipsis.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import Button from "../Button/Button";
import { useList } from "../../context/listProvider.jsx";
import { useModal } from "../../context/modalProvider.jsx";
import FirebaseListService from "../../firebase/FirebaseListService.js";

export default function ListPicker() {
  const { toggleActiveList, lists, loadAllLists } = useList();
  const { close } = useModal();

  function handleClick(list) {
    toggleActiveList(list);
    close();
  }

  async function handleDelete(list) {
    const listService = new FirebaseListService();
    await listService.deleteList(list);
    loadAllLists();
    toggleActiveList();
  }

  return (
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
              text={<EllipsisIcon className={`icon ${styles.iconEllipsis} `} />}
              variant="transparent"
            />
            <Button
              text={<TrashIcon className={`icon ${styles.iconTrash} `} />}
              variant="transparent"
              onClick={() => handleDelete(list)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
