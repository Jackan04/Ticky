import styles from "./Modal.module.css";
import Button from "../Button/Button";
import XMarkIcon from "../../assets/icons/xmark.svg?react";


export default function Input({ type }) {
  if (!isOpen) return null;

  return (
    <div className={`${styles.modal}`}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <Button
            variant="transparent"
            onClick={onClose}
            icon={<XMarkIcon className={`icon ${styles.XMarkIcon}`} />}
          ></Button>
        </div>
      </div>
    </div>
  );
}
