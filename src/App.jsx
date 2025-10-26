import "./App.css";
import { ThemeProvider } from "./context/themeProvider.jsx";
import { ModalProvider, useModal } from "./context/modalProvider.jsx";
import { ListProvider } from "./context/listProvider.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import Header from "./components/Header/Header.jsx";
import StatsList from "./components/Stats/StatsList.jsx";
import Modal from "./components/Modal/Modal.jsx";
import ActionConfirmContent from "./components/Modal/ActionConfirmContent.jsx";

function AppContent() {
  const { open, close, activeModal } = useModal();

  return (
    <div className="App">
      <Header></Header>
      <TaskInput />
      {/* <StatsList></StatsList> */}
      <TaskList></TaskList>
     
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ListProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </ListProvider>
    </ThemeProvider>
  );
}
