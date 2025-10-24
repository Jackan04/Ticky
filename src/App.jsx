import "./App.css";
import { ThemeProvider } from "./context/themeProvider.jsx";
import { ModalProvider, useModal } from "./context/modalProvider.jsx";
import TaskInput from "./components/TaskInput/TaskInput.jsx";
import TaskList from "./components/TaskList/TaskList.jsx";
import Header from "./components/Header/Header.jsx";
import Modal from "./components/Modal/Modal.jsx";
import TaskDetailsContent from "./components/Modal/TaskDetailsContent.jsx";
import NewTaskContent from "./components/Modal/NewTaskContent.jsx";
import NewListContent from "./components/Modal/NewListContent.jsx";
import ListPicker from "./components/ListPicker/ListPicker.jsx";
import StatsList from "./components/Stats/StatsList.jsx";

function AppContent() {
  const { open, close, activeModal } = useModal();

  return (
    <div className="App">
      <Header></Header>
      <TaskInput />
      <StatsList></StatsList>
      <TaskList></TaskList>

      {/* <ListPicker></ListPicker> */}

 

    
 
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AppContent />
      </ModalProvider>
    </ThemeProvider>
  );
}
