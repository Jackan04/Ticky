import styles from "./TaskInput.module.css";
import PlusIcon from "../../assets/icons/plus.svg?react";
import DropdownIcon from "../../assets/icons/drop-down.svg?react";
import Button from "../Button/Button";

export default function TaskInput() {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="New To-Do"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <div className={styles.controls}>
        <Button
          text={<DropdownIcon className={`icon ${styles.iconDropDown} `} />}
          variant="transparent"
        ></Button>
        <Button
          className={styles.btnAdd}
          text={<PlusIcon className={`icon ${styles.iconPlus}`} />}
          variant="default"
        ></Button>
      </div>
    </div>
  );
}
