import styles from "./Modal.module.css";
import ListIcon from "../../assets/icons/list.svg?react";
import { useList } from "../../context/listProvider.jsx";
import { useModal } from "../../context/modalProvider.jsx";

export default function ListPicker() {
  const { toggleActiveList, lists } = useList();
  const { close } = useModal();

  function handleClick(list) {
    toggleActiveList(list);
    close();
  }

  return (
    <ul className={styles.listPicker}>
      {lists.map((list) => (
        <li
          className={styles.list}
          key={list.id}
          onClick={() => handleClick(list)}
        >
          {list.name}
          <ListIcon className={`icon ${styles.iconList}`} />
        </li>
      ))}
    </ul>
  );
}
