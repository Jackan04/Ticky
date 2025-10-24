import styles from "./TaskList.module.css";
import TaskItem from "./TaskItem";

// TODO: Pass active list (global context) as a prop to display the correct task list
export default function TaskList() {
  return (
    <div>
      <ul className={styles.list}>
        <TaskItem text="Study for exam" completed={false}></TaskItem>
        <TaskItem text="Study for exam" completed={false}></TaskItem>
        <TaskItem text="Study for exam" completed={false}></TaskItem>
        <TaskItem text="Study for exam" completed={true}></TaskItem>
        <TaskItem text="Take out trash" completed={true}></TaskItem>
      </ul>
    </div>
  );
}
