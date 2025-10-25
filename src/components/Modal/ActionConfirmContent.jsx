import styles from "./Modal.module.css";
import ExclamationIcon from "../../assets/icons/exclamation.svg?react";
import Button from "../Button/Button";

export default function ActionConfirmContent({
  action,
  subText,
  onClick,
}) {
  return (
    <div className={styles.confirmActionContent}>
      <div className={styles.top}>
        <p className="subText">{subText}</p>
      </div>
      <Button text={action} variant="danger" onClick={onClick}></Button>
    </div>
  );
}
