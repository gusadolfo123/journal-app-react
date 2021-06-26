export const fileUpload = async (file) => {
  const URL = "https://api.cloudinary.com/v1_1/dgieo5oyq/image/upload";
  const formData = new FormData();
  formData.append("upload_preset", "journal-app");
  formData.append("file", file);

  try {
    const resp = await fetch(URL, {
      method: "POST",
      body: formData,
    });

    if (resp.ok) {
      const info = await resp.json();
      return info.secure_url;
    } else {
      throw await resp.json();
    }
  } catch (error) {
    throw error;
  }
};
