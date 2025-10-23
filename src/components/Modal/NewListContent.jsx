import styles from "./Modal.module.css";

export default function NewListContent() {
  return (
    <div className={styles.newListContent}>
      <input type="text" placeholder="New List" autoFocus></input>
    </div>
  );
}
