import "./App.css";
import Button from "./components/Button/Button.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";

export default function App() {
  return (
    <>
      <div>
        <Button text="Button" variant="success"></Button>
        <Button text="Button" variant="danger"></Button>
        <Button text="Button" variant="default"></Button>
      </div>
      <TaskInput />
    </>
  );
}
