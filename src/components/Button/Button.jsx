import styles from "./Button.module.css";
export default function Button({
  text,
  variant,
  className = "",
  onClick,
  ...props
}) {
  return (
    <button
      className={`${styles.btn} ${variant ? styles[variant] : ""} ${className}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
}
