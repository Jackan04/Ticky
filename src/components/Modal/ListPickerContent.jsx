import styles from "./Modal.module.css";
import { useEffect, useState } from "react";
import ListIcon from "../../assets/icons/list.svg?react";
import { sortObjectsByName } from "../../helpers.js";
import FirebaseListService from "../../firebase/FirebaseListService.js";

export default function ListPicker() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const listService = new FirebaseListService();
    async function load() {
      try {
        const result = await listService.getAllLists();
        result.sort((a, b) => a.name - b.name);
        sortObjectsByName(result);
        setLists(result);
      } catch (error) {
        console.error("Failed to load lists: ", error);
      }
    }

    load();
  }, []);

  return (
    <ul className={styles.listPicker}>
      {lists
        .map((list) => (
          <li className={styles.item} key={list.id}>
            {list.name}
            <ListIcon className={`icon ${styles.iconList}`} />
          </li>
        ))}
    </ul>
  );
}
