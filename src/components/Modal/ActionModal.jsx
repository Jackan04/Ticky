import Modal from "./Modal.jsx";
import ActionConfirmContent from "./ActionConfirmContent.jsx";

export default function ActionModal({
  isOpen,
  onClose,
  title = "Confirm",
  action = "Confirm",
  subText = "Are you sure?",
  onConfirm,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <ActionConfirmContent
        action={action}
        subText={subText}
        onClick={onConfirm}
      />
    </Modal>
  );
}
