import styles from "./Modal.module.css";
import ListIcon from "../../assets/icons/list.svg?react";

export default function ListPicker() {
  const lists = ["Personal", "School", "Groceries"];
  return (

      <ul className={styles.listPicker}>
        {lists.map((list, index) => (
          <li className={styles.item} key={index}>
            {list}
            <ListIcon className={`icon ${styles.iconList}`} />
          </li>
        ))}
      </ul>
  );
}
