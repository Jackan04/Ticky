import styles from "./Modal.module.css";
import ListIcon from "../../assets/icons/list.svg?react";
import { useList } from "../../context/listProvider.jsx";

export default function ListPicker() {
  const { toggleActiveList, lists } = useList();

  return (
    <ul className={styles.listPicker}>
      {lists.map((list) => (
        <li
          className={styles.list}
          key={list.id}
          onClick={() => toggleActiveList(list)}
        >
          {list.name}
          <ListIcon className={`icon ${styles.iconList}`} />
        </li>
      ))}
    </ul>
  );
}
