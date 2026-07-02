import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import Modal from "../components/Modal";
import { useToast } from "../customHooks/useToast";

const parseRestaurantUrl = (text) => {
  const match = text.match(/\/restaurant\/([a-f0-9]{24})/i);
  return match ? match[1] : null;
};

const QrScanner = ({ isOpen, onClose, onScan }) => {
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  const handleDecoded = (text) => {
    const restaurantId = parseRestaurantUrl(text);
    if (restaurantId) {
      onScan(restaurantId);
      onClose();
    } else {
      showToast("Invalid QR — no restaurant link found", "error");
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current?.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
      } catch {
        /* ignore */
      }
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const startScanner = async () => {
      try {
        html5QrCodeRef.current = new Html5Qrcode("qr-reader");
        await html5QrCodeRef.current.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          handleDecoded,
          () => {}
        );
      } catch {
        showToast("Camera access denied or unavailable", "error");
      }
    };

    startScanner();
    return () => { stopScanner(); };
  }, [isOpen]);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    await stopScanner();

    try {
      const reader = new Html5Qrcode("qr-file-hidden");
      const decoded = await reader.scanFile(file, true);
      handleDecoded(decoded);
    } catch {
      showToast("Could not read QR from image. Try a clearer photo.", "error");
      if (isOpen) {
        try {
          html5QrCodeRef.current = new Html5Qrcode("qr-reader");
          await html5QrCodeRef.current.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 240, height: 240 } },
            handleDecoded,
            () => {}
          );
        } catch {
          /* camera restart failed */
        }
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Scan Restaurant QR" size="md">
      <div id="qr-file-hidden" style={{ display: "none" }} />
      <div className="qr-scanner-layout">
        <div className="qr-scanner-main">
          <div id="qr-reader" ref={scannerRef} className="qr-scanner" />
          <p className="qr-scanner__hint">Point your camera at the restaurant QR code</p>
        </div>
        <aside className="qr-scanner-side">
          <div className="qr-scanner-side__divider">
            <span>or</span>
          </div>
          <label className="qr-scanner-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              hidden
            />
            <span className="qr-scanner-upload__icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="qr-scanner-upload__label">
              {uploading ? "Reading..." : "Upload QR Image"}
            </span>
            <span className="qr-scanner-upload__sub">PNG, JPG, WEBP</span>
          </label>
        </aside>
      </div>
    </Modal>
  );
};

export default QrScanner;
