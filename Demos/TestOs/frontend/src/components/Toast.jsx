const Toast = ({ message, type }) => {
  return (
    <div className={`toast toast--${type}`} role="status">
      <span className="toast__icon">
        {type === "error" ? "✕" : type === "warning" ? "!" : "✓"}
      </span>
      <span className="toast__message">{message}</span>
    </div>
  );
};

export default Toast;
