import styles from "./Modal.module.css";
import Button from "../Button/Button";

export default function ActionConfirmContent({
  action,
  subText,
  onClick,
}) {
  return (
    <div className={styles.confirmActionContent}>
      <div className={styles.top}>
        <p className="body">{subText}</p>
      </div>
      <Button text={action} variant="danger" onClick={onClick}></Button>
    </div>
  );
}
