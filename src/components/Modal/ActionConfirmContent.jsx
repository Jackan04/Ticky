import styles from "./Modal.module.css";
import ExclamationIcon from "../../assets/icons/exclamation.svg?react";
import Button from "../Button/Button";
import { useModal } from "../../context/modalProvider";

export default function ActionConfirmContent({
  action,
  subText,
  onClick,
}) {
  const { close } = useModal();

  return (
    <div className={styles.newListContent}>
      <ExclamationIcon className={`icon ${styles.iconExclamation}`} />
      <div className={styles.texts}>
        <p className="subText">{subText}</p>
      </div>

      <Button text={action} variant="danger" onClick={onClick}></Button>
    </div>
  );
}
