const generateQrBase64 = async (text) => {
  const url = `${process.env.QUICKCHART_API_URL}?text=${encodeURIComponent(text)}&format=base64`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to generate QR code from quickchart");
  }

  const blob = await response.blob();
  const qrBase64Text = await blob.text();
  return qrBase64Text;
};

module.exports = { generateQrBase64 };
