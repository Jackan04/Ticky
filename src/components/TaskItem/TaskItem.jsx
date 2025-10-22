import styles from "./TaskItem.module.css";
import CheckBoxIcon from "../../assets/icons/check-box.svg?react";
import EllipsisIcon from "../../assets/icons/ellipsis.svg?react";
import TrashIcon from "../../assets/icons/trash.svg?react";
import Button from "../Button/Button";

export default function TaskItem(props) {
  return (
    <div className={styles.task}>
      <div className={styles.controlsLeft}>
        <Button
          text={<CheckBoxIcon className={`icon ${styles.iconCheckBox} `} />}
          variant="transparent"
        />
        <span className={styles.text}>{props.text}</span>
      </div>

      <div className={styles.controlsRight}>
        <Button
          text={<EllipsisIcon className={`icon ${styles.iconEllipsis} `} />}
          variant="transparent"
        />
        <Button
          text={<TrashIcon className={`icon ${styles.iconTrash} `} />}
          variant="transparent"
        />
      </div>
    </div>
  );
}
