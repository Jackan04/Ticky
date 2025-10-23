import "./App.css";
import { ThemeProvider } from "./context/themeProvider.jsx";
import { useState } from "react";
import Button from "./components/Button/Button.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskItem from "./components/TaskItem/TaskItem.jsx";
import Header from "./components/Header/Header.jsx";
import Modal from "./components/Modal/Modal.jsx";
import TaskDetailsContent from "./components/Modal/TaskDetailsContent.jsx";

function AppContent() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return (
    <div className="App">
      <Header></Header>
      <div>
        <Button text="Button" variant="success"></Button>
        <Button text="Button" variant="danger"></Button>
        <Button text="Button" variant="default" onClick={open}></Button>
      </div>
      <TaskInput />
      <TaskItem text="Take out trash" completed={true}></TaskItem>
      <TaskItem text="Take out trash" completed={false}></TaskItem>

      <Modal isOpen={isOpen} onClose={close} title="Task Details" buttonText="Edit">
        <TaskDetailsContent
          title="Take out trash"
          dueDate="Oct 23, 2025"
          notes="nostrud esse laborum aute minim culpa id occaecat velit elit cillum qui qui aliquip Lorem consequat duis ea irure adipisicing in aute esse qui cupidatat nostrud nulla Lorem ad Lorem"
        />
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
