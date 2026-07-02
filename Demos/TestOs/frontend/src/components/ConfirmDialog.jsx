import Modal from "./Modal";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Delete" }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="confirm-dialog__message">{message}</p>
      <div className="confirm-dialog__actions">
        <button className="btn btn--secondary" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn--danger" onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
