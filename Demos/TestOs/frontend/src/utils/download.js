export const downloadImageFromUrl = async (url, filename = "download.png") => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to download image");
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
};
