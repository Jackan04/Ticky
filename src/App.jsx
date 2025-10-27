import "./App.css";
import { ThemeProvider } from "./context/themeProvider.jsx";
import { ModalProvider } from "./context/modalProvider.jsx";
import { ListProvider } from "./context/listProvider.jsx";
import { TaskProvider } from "./context/taskProvider.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import Header from "./components/Header/Header.jsx";

function AppContent() {
  return (
    <div className="App">
      <Header></Header>
      <TaskInput />
      <TaskList></TaskList>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ListProvider>
        <TaskProvider>
          <ModalProvider>
            <AppContent />
          </ModalProvider>
        </TaskProvider>
      </ListProvider>
    </ThemeProvider>
  );
}
