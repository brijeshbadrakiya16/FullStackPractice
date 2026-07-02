const LABELS = {
  bAddProduct: "Add",
  bUpdateProduct: "Edit",
  bRemoveProduct: "Delete",
  bService: "Orders",
};

const TogglePill = ({ name, active, onToggle, disabled = false }) => {
  return (
    <button
      type="button"
      className={`toggle-pill ${active ? "toggle-pill--on" : ""}`}
      onClick={() => !disabled && onToggle(name, !active)}
      disabled={disabled}
      aria-pressed={active}
      title={`${LABELS[name] || name}: ${active ? "ON" : "OFF"}`}
    >
      <span className="toggle-pill__dot" />
      <span className="toggle-pill__label">{LABELS[name] || name.replace("b", "")}</span>
    </button>
  );
};

export default TogglePill;
