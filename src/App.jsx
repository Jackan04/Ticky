import "./App.css";
import { ThemeProvider } from "./context/themeProvider.jsx";
import { useTheme } from "./context/themeProvider.jsx";
import Button from "./components/Button/Button.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskItem from "./components/TaskItem/TaskItem.jsx";

function AppContent() {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <div className="App">
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div>
        <Button text="Button" variant="success"></Button>
        <Button text="Button" variant="danger"></Button>
        <Button text="Button" variant="default"></Button>
      </div>
      <TaskInput />
      <TaskItem text="Take out trash"></TaskItem>
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
