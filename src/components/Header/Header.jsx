import styles from "./Header.module.css";
import ListIcon from "../../assets/icons/list.svg?react";
import LightbulbIcon from "../../assets/icons/lightbulb.svg?react";
import LightbulbFilledIcon from "../../assets/icons/lightbulb-full.svg?react";
import PlusIcon from "../../assets/icons/plus.svg?react";
import { useTheme } from "../../context/themeProvider";
import { useState } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import NewListContent from "../Modal/NewListContent";
import { useModal } from "../../context/modalProvider.jsx";


export default function Header() {
  const { toggleTheme, darkMode } = useTheme();
  const { open, close, activeModal } = useModal();
  const [activeList, setActiveList] = useState("Personal");

  return (
    <div className={styles.container}>
      <Button
        className={styles.listButton}
        variant="transparent"
        text={activeList}
        icon={<ListIcon className={`icon ${styles.iconList}`} />}
      ></Button>
      <div className={styles.controls}>
        <Button
          onClick={toggleTheme}
          variant="transparent"
          icon={
            darkMode ? (
              <LightbulbIcon className={`icon ${styles.iconMoon}`} />
            ) : (
              <LightbulbFilledIcon
                className={`icon ${styles.iconMoonFilled}`}
              />
            )
          }
        ></Button>
        <Button
          className={styles.btnAdd}
          text="List"
          icon={<PlusIcon className={`icon ${styles.iconPlus}`} />}
          variant="default"
          onClick={() => open("newList")}
        ></Button>
      </div>
      <Modal
        isOpen={activeModal === "newList"}
        onClose={close}
        title="New List"
        buttonText="Save"
      >
        <NewListContent></NewListContent>
      </Modal>
    </div>
  );
}
