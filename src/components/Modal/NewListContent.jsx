import styles from "./Modal.module.css";

export default function NewListContent({name, onChange}) {
  return (
    <div className={styles.newListContent}>
      <input
        type="text"
        placeholder="New List"
        autoFocus
        value={name}
        onChange={(e) => onChange({ name: e.target.value })}
      ></input>
    </div>
  );
}
