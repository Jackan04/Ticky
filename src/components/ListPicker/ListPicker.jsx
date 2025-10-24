import styles from "./ListPicker.module.css";
import ListIcon from "../../assets/icons/list.svg?react";

export default function ListPicker() {
  const lists = ["Personal", "School", "Groceries"];
  return (
    <div className={styles.menu}>
      <p className={styles.title}>Lists</p>
      <ul className={styles.list}>
        {lists.map((list, index) => (
          <li className={styles.item} key={index}>
            {list}
            <ListIcon className={`icon ${styles.iconList}`} />
          </li>
        ))}
      </ul>
    </div>
  );
}
