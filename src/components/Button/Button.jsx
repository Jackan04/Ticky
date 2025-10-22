import styles from "./Button.module.css";
export default function Button(props) {
  return (
    <button
      className={`${styles.btn} ${props.variant ? styles[props.variant] : ""}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
