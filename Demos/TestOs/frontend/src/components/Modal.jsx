import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const prevOverflow = style.overflow;
    const prevPosition = style.position;
    const prevTop = style.top;
    const prevWidth = style.width;

    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      style.overflow = prevOverflow;
      style.position = prevPosition;
      style.top = prevTop;
      style.width = prevWidth;
      window.scrollTo(0, scrollY);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-root"
      role="presentation"
      ref={overlayRef}
    >
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="modal-stage">
        <div
          className={`modal modal--${size}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal__header">
            <h2 className="modal__title" id="modal-title">{title}</h2>
            <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="modal__body">{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
