import "./App.css";
import { ThemeProvider } from "./context/themeProvider.jsx";
import Button from "./components/Button/Button.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskItem from "./components/TaskItem/TaskItem.jsx";
import Header from "./components/Header/Header.jsx";

function AppContent() {
  return (
    <div className="App">
      <Header></Header>
      <div>
        <Button text="Button" variant="success"></Button>
        <Button text="Button" variant="danger"></Button>
        <Button text="Button" variant="default"></Button>
      </div>
      <TaskInput />
      <TaskItem text="Take out trash" completed={true}></TaskItem>
      <TaskItem text="Take out trash" completed={false}></TaskItem>
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
