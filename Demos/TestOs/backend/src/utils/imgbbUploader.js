const uploadToImgbb = async (base64Image) => {
  const formData = new FormData();
  formData.append("image", base64Image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    { method: "POST", body: formData }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error?.message || "Failed to upload image to imgbb");
  }

  return {
    url: data.data.url,
    deleteUrl: data.data.delete_url,
  };
};

const log = require("./logger");

const deleteFromImgbb = async (deleteUrl) => {
  if (!deleteUrl) return;

  try {
    log.delete("RIP image. Gone but not forgotten. Yeeting from imgbb...");
    await fetch(deleteUrl, { method: "POST" });
  } catch (error) {
    log.warn(`imgbb delete whimpered but we march on: ${error.message}`);
  }
};

module.exports = { uploadToImgbb, deleteFromImgbb };
