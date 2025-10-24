import "./App.css";
import { ThemeProvider } from "./context/themeProvider.jsx";
import { useState } from "react";
import Button from "./components/Button/Button.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskItem from "./components/TaskItem/TaskItem.jsx";
import Header from "./components/Header/Header.jsx";
import Modal from "./components/Modal/Modal.jsx";
import TaskDetailsContent from "./components/Modal/TaskDetailsContent.jsx";
import NewTaskContent from "./components/Modal/NewTaskContent.jsx";
import NewListContent from "./components/Modal/NewListContent.jsx";
import ListPicker from "./components/ListPicker/ListPicker.jsx";

function AppContent() {
  const [openModal, setOpenModal] = useState(null);

  const open = (name) => setOpenModal(name);

  const close = () => setOpenModal(null);

  return (
    <div className="App">
      <Header></Header>
      <div>
        <Button
          text="New List"
          variant="success"
          onClick={() => open("newList")}
        ></Button>
        <Button
          text="New Task"
          variant="danger"
          onClick={() => open("newTask")}
        ></Button>
        <Button
          text="Task Details"
          variant="default"
          onClick={() => open("taskDetails")}
        ></Button>
      </div>
      <TaskInput />
      <TaskItem text="Take out trash" completed={true}></TaskItem>
      <TaskItem text="Take out trash" completed={false}></TaskItem>
      <ListPicker></ListPicker>

      <Modal
        isOpen={openModal === "taskDetails"}
        onClose={close}
        title="Task Details"
        buttonText="Edit"
      >
        <TaskDetailsContent
          title="Take out trash"
          dueDate="Oct 23, 2025"
          notes="nostrud esse laborum aute minim culpa id occaecat velit elit cillum qui qui aliquip Lorem consequat duis ea irure adipisicing in aute esse qui cupidatat nostrud nulla Lorem ad Lorem"
        />
      </Modal>

      <Modal
        isOpen={openModal === "newTask"}
        onClose={close}
        title="New To-Do"
        buttonText="Save"
      >
        <NewTaskContent></NewTaskContent>
      </Modal>
      <Modal
        isOpen={openModal === "newList"}
        onClose={close}
        title="New List"
        buttonText="Save"
      >
        <NewListContent></NewListContent>
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
